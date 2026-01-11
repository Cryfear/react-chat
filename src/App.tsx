import { useEffect } from "react";
import { Navigate } from "react-router";
import { useGate, useUnit } from "effector-react";

import { $LoginStore, isLoginFx } from "@stores/Login.model";
import { useLocation } from "react-router";
import { AppGate } from "./gates/AppGate";
import { $AppStore } from "./store/App.model";
import { Loading } from "./utils/Loading";
import { HostRoutes } from "./components/Routes/HostRoutes";

import "./styles/normalize.scss";
import "./styles/index.scss";
import { socket } from "./socket";

export const App = () => {
  const { isAuth, isChecked, isMobileVersion } = useUnit({
    isAuth: $LoginStore.map((s) => s.isAuth),
    isChecked: $LoginStore.map((s) => s.isChecked),
    isMobileVersion: $AppStore.map((s) => s.isMobileVersion),
  });

  const location = useLocation();
  const allowedPathsWithoutAuth = ["/auth", "/home/profile/"];

  const shouldRedirect = !isAuth && isChecked && !allowedPathsWithoutAuth.some((path) => location.pathname.startsWith(path));

  useGate(AppGate);

  useEffect(() => {
    if (!isChecked) {
      isLoginFx({
        email: sessionStorage.getItem("email"),
        authToken: sessionStorage.getItem("auth-token"),
      }).then(() => socket.emit("auth", sessionStorage.getItem('id')));
    }
  }, [isChecked]);

  if (!isChecked) {
    return <Loading />;
  }

  return (
    <div className={isMobileVersion ? "mobile app" : "app"}>
      <HostRoutes />
      {shouldRedirect && <Navigate to="/auth/login" />}
    </div>
  );
};
