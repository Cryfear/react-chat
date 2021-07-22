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

$LoginStore.on(LoginFx.done, (state, payload: any) => {
  if(payload.result.data.responseCode === 'success') {
    return {
      ...state,
      isAuth: true
    }
  }
  return state
});