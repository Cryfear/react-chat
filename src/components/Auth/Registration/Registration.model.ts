import { createStore } from "effector";

import { createEffect } from 'effector';
import { UsersApi } from "../../../api/UsersApi";

export const CreateAccountFx = createEffect(async (data: { email: string, name: string, password: string }) => {
  return await UsersApi.create(data);
});

export const $RegistrationStore = createStore({
  isRegistrated: false,
  isSucceed: false
});

$RegistrationStore.on(CreateAccountFx.done, (state, payload) => {
  console.log(payload);
  return {
    ...state,
    isRegistrated: true
  }
});