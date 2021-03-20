import { createStore } from "effector";
import { AuthApi } from '../../../api/AuthApi';

import { createEffect } from 'effector'

export const LoginFx = createEffect(async (data: { email: string, password: string }) => {
  return await AuthApi.login(data);
})

export const $LoginStore = createStore({
  isAuth: false,
  isChecked: false
});

$LoginStore.on(LoginFx.done, (state, payload) => {
  console.log(payload);
  return {
    ...state,
    isAuth: true
  }
});

$LoginStore.watch(console.log);