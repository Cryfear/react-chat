import React, { useState } from "react";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Input } from "../../../components/Input/Input";
import { Field, reduxForm } from "redux-form";
import { required } from "../../../assets/validations.jsx";
import { UsersApi } from "../../../api/api";

const AuthForm = props => {
  let [isLogin, setLogin] = useState(false);
  const submit = values => {
    UsersApi.loginUser(values).then(data => {
      console.log(data);
      if (data.data.isAccess) {
        document.querySelector('input[name="password"]').nextSibling.innerHTML = "Вы вошли!";
        document.querySelector('input[name="password"]').nextSibling.style.color = "green";
        setLogin(true);
      } else {
        document.querySelector('input[name="password"]').nextSibling.innerHTML =
          "Неправильный логин или пароль";
        document.querySelector('input[name="password"]').nextSibling.style.color = "red";
        setLogin(false);
      }
    });
  };
  return isLogin ? (
    "Вошел!!!"
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
    </div>
  );
};

let AuthReduxForm = reduxForm({
  form: "Auth",
})(AuthForm);

export default AuthReduxForm;
