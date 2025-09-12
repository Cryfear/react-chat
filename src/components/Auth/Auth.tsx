import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginContainer } from "./Login/LoginContainer";
import { Registratation } from "./Registration/Registration";

export const Auth = () => {
  return (
    <div className="auth">
      <Routes>
        <Route path="login" element={<LoginContainer />} />
        <Route path="registration" element={<Registratation />} />
      </Routes>
    </div>
  );
};
