import React from "react";
import TypicalButton from "../../components/Button/TypicalButton";
import AuthForm from "./AuthForm";
import "./Auth.scss";

const Auth = (props) => {
  return (
    <div className="auth">
      <div className="auth__wrapper">
        <h1 className="auth__mainTitle">Войти в аккаунт</h1>
        <h4 className="auth__loginTitle">Пожалуйста, войдите в свой аккаунт</h4>
        <AuthForm />
        <TypicalButton
          classes="auth__button-active"
          children="Войти в аккаунт"
        />
        <h3 className="auth__registrationTitle">
          <a href="/">Зарегистрироваться</a>
        </h3>
      </div>
    </div>
  );
};

export default Auth;
