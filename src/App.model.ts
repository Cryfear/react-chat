import {createEffect, createStore} from "effector";

export const isMobileVersionChanger = createEffect((boolean: boolean) => {
  return boolean;
});

type AppStoreTypes = {
  isMobileVersion: boolean;
}

export const $AppStore = createStore<AppStoreTypes>({
  isMobileVersion: false
})
  .on(isMobileVersionChanger.doneData, (state, boolean) => {
    if (state.isMobileVersion !== boolean) {
      return {
        ...state,
        isMobileVersion: boolean,
      };
    }
    return state;
  })
