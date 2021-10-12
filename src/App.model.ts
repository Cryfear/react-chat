import { socket } from "./socket";
import { createStore, createEffect } from "effector";
import { AuthApi } from "./api/AuthApi";

export const isLoginFx = createEffect(
  async ({ email, authToken }: { email: string; authToken: string }) => {
    const result = await AuthApi.isLoginNow({ email, authToken }).then((data) => {
      socket.emit("send-id", sessionStorage["id"]);
      
      return data;
    });

    if (result.data.responseCode === "success") return result.data;
  }
);

export const logoutFx = createEffect(async () => {
  return await AuthApi.logout();
});

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
  .on(logoutFx.doneData, (state, boolean) => {
    if(boolean) {
      return {
        ...state,
        isAuth: false,
      };
    }
    return state;
  });
