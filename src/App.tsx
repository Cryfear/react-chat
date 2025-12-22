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

export const App = () => {
  const store = useUnit($LoginStore);
  const appStore = useUnit($AppStore);
  const location = useLocation();
  const allowedPathsWithoutAuth = ["/auth", "/home/profile/"];

  const shouldRedirect = !store.isAuth && store.isChecked && !allowedPathsWithoutAuth.some((path) => location.pathname.startsWith(path));

  useGate(AppGate);

  useEffect(() => {
    if (!store.isChecked) {
      isLoginFx({
        email: sessionStorage["email"],
        authToken: sessionStorage["auth-token"],
      });
    }
  }, [store.isChecked]);

  if (!store.isChecked) {
    return <Loading />;
  }

  return (
    <div className={appStore.isMobileVersion ? "mobile app" : "app"}>
      <HostRoutes />
      {shouldRedirect && <Navigate to="/auth/login" />}
    </div>
  );
};
