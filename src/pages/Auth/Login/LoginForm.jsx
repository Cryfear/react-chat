import React, { useState, useEffect } from "react";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Input } from "../../../components/Input/Input";
import { Field, reduxForm } from "redux-form";
import { required } from "../../../assets/validations.jsx";
import { UsersApi } from "../../../api/api";
import { Link } from "react-router-dom";

const AuthForm = props => {
  let [isLogin, setLogin] = useState(false);
  useEffect(() => {
    if (sessionStorage.userEmail)
      UsersApi.isLoginNow(sessionStorage.userEmail).then(data => {
        setLogin(true);
        console.log(data);
      });
  }, []);

  const logout = () => {
    UsersApi.logoutUser();
    setLogin(false);
  };

  const submit = values => {
    let warningText = document.querySelector('input[name="password"]').nextSibling;
    UsersApi.loginUser(values).then(data => {
      console.log(data);
      if (data.data.isAccess) {
        warningText.innerHTML = "Вы вошли!";
        warningText.style.color = "green";
        setLogin(true);
      } else {
        warningText.innerHTML = "Неправильный логин или пароль";
        warningText.style.color = "red";
        setLogin(false);
      }
    });
  };
  return isLogin ? (
    <div>
      <span>`Вошел!!!${sessionStorage.userEmail}`</span>
      <div>
        <button onClick={logout}>Выйти</button>
      </div>
    </div>
  ) : (
    <div className="auth__form">
      <form onSubmit={props.handleSubmit(submit)} name="normal_login">
        <Field
          name="email"
          type="text"
          prefix={<MailOutlined />}
          classes="form__username"
          placeholder="E-Mail"
          component={Input}
          validate={[required]}
        />
        <Field
          name="password"
          type="password"
          prefix={<LockOutlined />}
          classes="form__username"
          placeholder="Password"
          component={Input}
          validate={[required]}
        />
        <button type="submit" className="auth__button auth__button-active">
          Войти в аккаунт
        </button>
      </form>
      <h4 className="auth__registrationTitle">
        <Link to="registration">Зарегистрироваться</Link>
      </h4>
    </div>
  );
};

let AuthReduxForm = reduxForm({
  form: "Auth",
})(AuthForm);

export default AuthReduxForm;
