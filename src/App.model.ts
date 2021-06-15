import { createStore, createEffect } from "effector";
import { AuthApi } from "./api/AuthApi";

interface UserDataTypes {
  isAuth: boolean;
  isChecked: boolean;
}

type isAuthTypes = {
  email: string;
  authToken: string;
};

export const isLoginFx = createEffect(
  async ({ email, authToken }: isAuthTypes) => {
    const result = await AuthApi.isLoginNow(email, authToken);
    return result.data.responseCode;
  }
);

export const isAuthData = createStore({
  isAuth: false,
  isChecked: false,
}).on(isLoginFx.doneData, (state: UserDataTypes, data) => {
  if (data === "success") {
    return {
      ...state,
      isAuth: true,
      isChecked: true,
    };
  }
  return { ...state, isChecked: true };
});
