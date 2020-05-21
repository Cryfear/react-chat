import React from "react";
import TypicalButton from "../../../components/Button/TypicalButton";
import AuthForm from "./AuthForm";
import {Link} from 'react-router-dom';

const Login: React.FC = (props) => {
  return (
    <div className="login__wrapper">
      <h1 className="auth__mainTitle">Войти в аккаунт</h1>
      <h4 className="auth__loginTitle">Пожалуйста, войдите в свой аккаунт</h4>
      <AuthForm />
      <TypicalButton classes="auth__button-active" children="Войти в аккаунт" />
      <h4 className="auth__registrationTitle">
        <Link to="registration">Зарегистрироваться</Link>
      </h4>
    </div>
  );
};

export default Login;
