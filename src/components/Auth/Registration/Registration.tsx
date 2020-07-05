import React from "react";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import RegistrationSuccess from "./RegistrationSuccess/RegistationSucces";
import { Link } from "react-router-dom";
import "./Registration.scss";

interface RegistrationTypes {
  isSuccess: Boolean;
}

const Registration = (props: RegistrationTypes) => {
  return props.isSuccess ? (
    <RegistrationSuccess />
  ) : (
    <div className="login__wrapper">
      <h1 className="auth__mainTitle">Зарегистрироваться</h1>
      <h4 className="auth__loginTitle">Для входа в чат, вам нужно зарегистрироваться</h4>
      <div className="auth__wrapper">
        <RegistrationForm />
        <h4 className="auth__registrationTitle">
          <Link to="/">Войти в аккаунт</Link>
        </h4>
      </div>
    </div>
  );
};

export default Registration;
