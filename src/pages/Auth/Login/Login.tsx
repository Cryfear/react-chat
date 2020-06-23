import React from "react";
import LoginForm from "./LoginForm";

class Login extends React.Component {
  render() {
    return (
      <div className="login__wrapper">
        <h1 className="auth__mainTitle">Войти в аккаунт</h1>
        <h4 className="auth__loginTitle">Пожалуйста, войдите в свой аккаунт</h4>
        <div className="auth__wrapper">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default Login;
