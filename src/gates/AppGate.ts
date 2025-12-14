import { isLoginFx } from "@/store/Login.model";
import { sample } from "effector";
import { createGate } from "effector-react";

export const AppGate = createGate();

sample({
  clock: AppGate.open,
  filter: () => Boolean(sessionStorage["auth-token"]),
  fn: () => ({
    email: sessionStorage["email"],
    authToken: sessionStorage["auth-token"],
  }),
  target: isLoginFx,
});
