import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const RegistrationSucces = () => {
  return (
    <div className="login__wrapper">
      <h1 className="auth__mainTitle">Регистрация</h1>
      <h4 className="auth__loginTitle">
        Для входа в чат, вам нужно зарегестрироваться
      </h4>
      <div className="auth__wrapper">
        <ExclamationCircleOutlined
          style={{
            color: "#1890FF",
            fontSize: "40px",
            marginTop: "60px",
            marginBottom: "30px",
          }}
        />
        <h2 className="auth__mainTitle">Подтвердите свой аккаунт</h2>
        <h4 className="auth__loginTitle">
          На вашу почту отправлено письмо с ссылкой на подтверждение аккаунта
        </h4>
      </div>
    </div>
  );
};

export default RegistrationSucces;
