import { createStore } from "effector";
import { AuthApi } from "../../../api/AuthApi";

import { createEffect } from "effector";
import { socket } from "../../../socket";
import { LoginStoreTypes } from "../Auth.types";

export const $LoginStore = createStore<LoginStoreTypes>({
  isAuth: false,
  isChecked: false,
  isCorrectLogin: null,
  myUserData: {
    // данные самого залогиненного пользователя
    id: "",
    avatar: "",
    name: "",
    isOnline: false,
  },
});

export const isLoginFx = createEffect(async ({ email, authToken }: { email: string, authToken: string }) => {
  const dontAuth =
    (email === "undefined" && authToken === "undefined") ||
    (email === undefined && authToken === undefined) ||
    (email === "null" && authToken === "null");
  if (!dontAuth) {
    return await AuthApi.isLoginNow({ email, authToken }).then(
      (data) => {
        socket.emit("send-id", sessionStorage["id"]);
        if (data.data.responseCode === "success") return data.data;
        return { responseCode: "failed token auth" };
      }
    );
  }
  return { responseCode: "Войдите в аккаунт" };
});

export const logoutFx = createEffect(async () => {
  return await AuthApi.logout();
});

export const LoginFx = createEffect(
  async (data: { email: string; password: string }) => {
    return await AuthApi.login(data);
  }
);


$LoginStore.on(LoginFx.done, (state, { result }) => {
  if (result.data.responseCode === "success") {
    console.log(result.data);
    return {
      ...state,
      isAuth: true,
      isCorrectLogin: true,
      myUserData: {
        // данные самого залогиненного пользователя
        id: result.data.id,
        avatar: result.data.avatar,
        name: result.data.fullName,
        email: result.data.email,
        isOnline: result.data.isOnline,
      },
    };
  }
  return {
    ...state,
    isCorrectLogin: false,
  };
}).on(isLoginFx.doneData, (state, data) => {
  if (data.responseCode === "success") {
    return {
      ...state,
      isAuth: true,
      isChecked: true,

      myUserData: {
        // данные самого залогиненного пользователя
        id: data.id,
        avatar: data.avatar,
        name: data.fullName,
        email: data.email,
        isOnline: data.isOnline,
      },
    };
  }
  return { ...state, isChecked: true };
}).on(logoutFx.doneData, (state, boolean) => {
  if (boolean) {
    return {
      ...state,
      isAuth: false,
    };
  }
  return state;
});
;
