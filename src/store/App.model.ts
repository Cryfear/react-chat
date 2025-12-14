import { createEvent, createStore, sample } from "effector";
import { AppStoreTypes } from "@/types/Home.types";

export const isMobileVersionChanger = createEvent<boolean>();

export const $AppStore = createStore<AppStoreTypes>({
  isLoading: true,
  isMobileVersion: false,
})

sample({
  clock: isMobileVersionChanger,
  source: $AppStore,
  fn: (state, isMobileVersion) => ({
    ...state,
    isMobileVersion,
  }),
  target: $AppStore,
});
