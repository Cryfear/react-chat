import { createStore, createEffect } from "effector";
import { AuthApi } from "./api/AuthApi";

export const isLoginFx = createEffect(
  async ({ email, authToken }: { email: string; authToken: string }) => {
    const result = await AuthApi.isLoginNow({ email, authToken });
    if (result.data) return result.data.responseCode;
  }
);

export const isAuthData = createStore({
  isAuth: false, // залогинен ли
  isChecked: false, // проверен ли пользователь на авторизованность
  myUserData: {
    // данные самого залогиненного пользователя
    id: "",
    avatar: "",
    name: "",
    isOnline: false,
  },
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
