import React from "react";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Input } from "../../Input/Input";
import { Field } from "redux-form";
import { required } from "../../../assets/validations.jsx";
import { Link } from "react-router-dom";
import "../Auth.scss";

const LoginForm = props => {
  return (
    <div className="auth__form">
      <form onSubmit={props.handleSubmit(props.submit)} name="normal_login">
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

export default LoginForm;
