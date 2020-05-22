import React from "react";
import RegistrationForm from "./RegistrationForm";
import TypicalButton from "../../../components/Button/TypicalButton";
import { Link } from "react-router-dom";
import RegistrationSucces from "./RegistationSucces";

const Registration = () => {
  let success: boolean = false;
  return !success ? (
    <div className="login__wrapper">
      <h1 className="auth__mainTitle">Зарегистрироваться</h1>
      <h4 className="auth__loginTitle">
        Для входа в чат, вам нужно зарегистрироваться
      </h4>
      <div className="auth__wrapper">
        <RegistrationForm />
        <TypicalButton
          classes="auth__button-active"
          children="Зарегистрироваться"
        />
        <h4 className="auth__registrationTitle">
          <Link to="/">Войти в аккаунт</Link>
        </h4>
      </div>
    </div>
  ) : (
    <RegistrationSucces />
  );
};

export default Registration;
