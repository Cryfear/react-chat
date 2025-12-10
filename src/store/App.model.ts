import { createEvent, createStore, sample } from "effector";

export const isMobileVersionChanger = createEvent<boolean>();

export const $AppStore = createStore<AppStoreTypes>({
  isLoading: false,
  isMobileVersion: false,
})

sample({
  clock: isMobileVersionChanger,
  source: $AppStore,
  fn: (state, isMobileVersion) => ({
    ...state, // сохраняем все предыдущие поля
    isMobileVersion, // обновляем только нужное
  }),
  target: $AppStore,
});

type AppStoreTypes = {
  isLoading: boolean,
  isMobileVersion: boolean
}

