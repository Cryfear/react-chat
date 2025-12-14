import React, { useEffect } from "react";
import { Auth } from "./components/Auth/Auth";
import { Home } from "./components/Home/Home";
import "./styles/normalize.css";
import "./styles/index.scss";
import { Navigate, Route, Routes } from "react-router";
import { useGate, useUnit } from "effector-react";
import { $LoginStore, isLoginFx } from "@stores/Login.model";
import { useLocation } from "react-router";
import { AppGate } from "./gates/AppGate";

export const App = () => {
  const store = useUnit($LoginStore);
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
      return (
        <div className="app-loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      );
    }

  return (
    <div className="app">
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/auth/*" element={<Auth />} />
      </Routes>
      {shouldRedirect && <Navigate to="/auth/login" />}
    </div>
  );
};
