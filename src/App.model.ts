import { socket } from "./socket";
import { createStore, createEffect } from "effector";
import { AuthApi } from "./api/AuthApi";

export const isLoginFx = createEffect(
  async ({ email, authToken }: { email: string; authToken: string }) => {
    const result = await AuthApi.isLoginNow({ email, authToken }).then(
      (data) => {
        socket.emit("send-id", sessionStorage["id"]);

        return data;
      }
    );
    if (result.data) return result.data.responseCode;
  }
);

export const isMobileVersionChanger = createEffect((boolean: boolean) => {
  return boolean;
});

export const isAuthData = createStore({
  isAuth: false, // залогинен ли
  isChecked: false, // проверен ли пользователь на авторизованность
  isMobileVersion: false,
  myUserData: {
    // данные самого залогиненного пользователя
    id: "",
    avatar: "",
    name: "",
    isOnline: false,
  },
})
  .on(isLoginFx.doneData, (state, data) => {
    if (data === "success") {
      return {
        ...state,
        isAuth: true,
        isChecked: true,
      };
    }
    return { ...state, isChecked: true };
  })
  .on(isMobileVersionChanger.doneData, (state, boolean) => {
    if(state.isMobileVersion !== boolean) {
      return {
        ...state,
        isMobileVersion: boolean,
      };
    }
    return state;
  });
