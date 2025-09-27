import { createStore, createEffect } from "effector";

export const isOpenDialogsSwitcherFx = createEffect(() => {});

export const $Show_Hide_ButtonStore = createStore({
  isOpenDialogs: false,
}).on(isOpenDialogsSwitcherFx.doneData, (state, _) => {
  return {
    isOpenDialogs: !state.isOpenDialogs,
  };
});
