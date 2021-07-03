import { createStore, createEffect } from "effector";
import { AuthApi } from "./api/AuthApi";
import { UsersApi } from "./api/UsersApi";

export const isLoginFx = createEffect(
  async ({ email, authToken }: { email: string; authToken: string }) => {
    const result = await AuthApi.isLoginNow({ email, authToken });
    return result.data.responseCode;
  }
);

export const findUserFx = createEffect(async ({userId}: any) => {
  return await UsersApi.findUser(userId);
})

export const isAuthData = createStore({
  isAuth: false,
  isChecked: false,
}).on(isLoginFx.doneData, (state, data) => {
  if (data === "success") {
    return {
      ...state,
      isAuth: true,
      isChecked: true,
    };
  }
  return { ...state, isChecked: true };
});
