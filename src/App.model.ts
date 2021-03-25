import { createStore, createEvent } from "effector";
import { AuthApi } from './api/AuthApi';

interface UserDataTypes {
  isAuth: boolean,
  isChecked: boolean
}

type isAuthTypes = {
  email: string,
  authToken: string
}

export const isAuth = createEvent<isAuthTypes>();

export const isAuthData = createStore({
  isAuth: false,
  isChecked: false
})
  .on(isAuth, (state: UserDataTypes, data: isAuthTypes) => {
    AuthApi.isLoginNow(data.email, data.authToken);
    return {
      ...state,
      isAuth: false,
      isChecked: true
    }
  })

isAuthData.watch(console.log);