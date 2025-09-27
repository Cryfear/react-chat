import { createEvent, createStore, sample } from "effector";

export const isMobileVersionChanger = createEvent<boolean>();

export const $AppStore = createStore({
  isMobileVersion: false
})

sample({
  clock: isMobileVersionChanger,
  source: $AppStore,
  fn: (_, value: boolean) => ({ isMobileVersion: value }),
  target: $AppStore
})
