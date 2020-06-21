import React from "react";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import { UsersApi } from "../../../api/api";

class Login extends React.Component {
  componentDidMount() {
    UsersApi.isLoginNow().then(data => {
      console.log(data);
    });
  }
  render() {
    return (
      <div className="login__wrapper">
        <h1 className="auth__mainTitle">Войти в аккаунт</h1>
        <h4 className="auth__loginTitle">Пожалуйста, войдите в свой аккаунт</h4>
        <div className="auth__wrapper">
          <LoginForm />
          <h4 className="auth__registrationTitle">
            <Link to="registration">Зарегистрироваться</Link>
          </h4>
        </div>
      </div>
    );
  }
}

export default Login;
