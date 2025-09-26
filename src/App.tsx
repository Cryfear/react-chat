import React, { useEffect } from "react";

import { Auth } from "./components/Auth/Auth";
import { Home } from "./components/Home/Home";

import "./styles/normalize.css";
import "./styles/index.scss";

import { Navigate, Route, Routes } from "react-router";
import { useUnit } from "effector-react";
import { $LoginStore, isLoginFx } from "./components/Auth/Login/Login.model";
import { useLocation } from "react-router";

export const App = () => {
  const store = useUnit($LoginStore);
  const location = useLocation();

  useEffect(() => {
    if (!store.isChecked) {
      isLoginFx({
        email: sessionStorage["email"],
        authToken: sessionStorage["auth-token"],
      }).then((data) => data).catch(err => err);
    }
  }, [store.isChecked]);

  const allowedPathsWithoutAuth = [
    '/auth',
    '/home/profile/'
  ];

  const shouldRedirect = !store.isAuth && 
    store.isChecked && 
    !allowedPathsWithoutAuth.some(path => location.pathname.startsWith(path));

  return (
    <div className="app">
      <Routes>
        <Route path="/home/*" element={<Home />} />
        <Route path="/auth/*" element={<Auth />} />
      </Routes>
      {shouldRedirect && <Navigate to="/auth/login" />}
    </div>
  );
};
