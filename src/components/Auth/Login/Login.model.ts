import { createStore } from "effector";
import { AuthApi } from "../../../api/AuthApi";

import { createEffect } from "effector";

interface LoginStoreTypes {
  isAuth: boolean;
  isChecked: boolean;
  isCorrectLogin: null | boolean;
}

export const LoginFx = createEffect(
  async (data: { email: string; password: string }) => {
    return await AuthApi.login(data);
  }
);

export const $LoginStore = createStore<LoginStoreTypes>({
  isAuth: false,
  isChecked: false,
  isCorrectLogin: null,
});

$LoginStore.on(LoginFx.done, (state, payload: any) => {
  if (payload.result.data.responseCode === "success") {
    return {
      ...state,
      isAuth: true,
      isCorrectLogin: true,
    };
  }
  return {
    ...state,
    isCorrectLogin: false,
  };
});
