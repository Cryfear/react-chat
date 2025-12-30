import { createStore, createEffect } from "effector";

export const isOpenDialogsSwitcherFx = createEffect(() => {});

export const $isOpenDialogs = createStore({
  isOpenDialogs: false,
}).on(isOpenDialogsSwitcherFx.doneData, (state, _) => {
  return {
    isOpenDialogs: !state.isOpenDialogs,
  };
});
