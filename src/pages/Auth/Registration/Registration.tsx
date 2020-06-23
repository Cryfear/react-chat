import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import RegistrationSuccess from "./RegistationSucces";
import { Link } from "react-router-dom";

const Registration = () => {
  let [successStatus, setSuccess] = useState(false);
  if (false) setSuccess(false); // not realized functional
  return successStatus ? (
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
