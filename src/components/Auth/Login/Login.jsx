import React from "react";
import LoginForm from "./LoginFormContainer";

const Login = props => {
  return (
    <div className="login__wrapper">
      <h1 className="auth__mainTitle">Войти в аккаунт</h1>
      <h4 className="auth__loginTitle">Пожалуйста, войдите в свой аккаунт</h4>
      <div className="auth__wrapper">
        <LoginForm setLoginUserAction={props.setLoginUserAction} />
      </div>
    </div>
  );
};

export default Login;
