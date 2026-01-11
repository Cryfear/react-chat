import { createStore } from "effector";
import { AuthApi } from "@api/AuthApi";
import { createEffect } from "effector";
import { LoginStoreTypes } from "@/types/Auth.types";
import { UsersApi } from "@api/UsersApi";
import { getSocket } from "@/socket";

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

export const $myUserData = $LoginStore.map((s) => s.myUserData);

export const uploadFileFx = createEffect<File | null, { success: boolean; avatar?: string }, Error>(async (file) => {
  if (!file) {
    console.warn("Файл не выбран!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  return await UsersApi.changeUserPhoto(formData);
});

export const isLoginFx = createEffect(async ({ email, authToken }: { email: string | null, authToken: string | null }) => {
  const isInvalidAuth =
    (email === "undefined" && authToken === "undefined") ||
    (email === undefined && authToken === undefined) ||
    (email === "null" && authToken === "null");
  if (!isInvalidAuth) {
    return await AuthApi.isLoginNow({ email, authToken }).then(
      (data) => {
        const socket = getSocket();
        socket.emit("send-id", sessionStorage.getItem("id"));
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
