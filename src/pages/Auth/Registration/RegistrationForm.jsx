import React from "react";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Field, reduxForm } from "redux-form";
import { Input } from "../../../components/Input/Input";
import "./Registration.scss";
import {
  required,
  requiredPassword,
  emailValidate,
  passwordValidate,
  repeatePasswordValidate,
} from "../../../assets/validations.jsx";
import { UsersApi } from "../../../api/api";

class RegistrationForm extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
      JSON.stringify(this.state) !== JSON.stringify(nextState)
    );
  }

  submit = values => {
    UsersApi.createUser(values);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.submit)}>
        <Field
          name="email"
          type="text"
          id="email"
          prefix={<MailOutlined />}
          classes="form__username"
          placeholder="E-mail"
          component={Input}
          validate={[required, emailValidate]}
        />
        <Field
          name="username"
          type="text"
          prefix={<UserOutlined />}
          classes="form__username"
          placeholder="Ваше имя"
          component={Input}
          validate={[required]}
        />
        <Field
          name="password"
          type="password"
          id="repeater"
          prefix={<LockOutlined />}
          classes="form__password"
          placeholder="Придумайте пароль"
          component={Input}
          validate={[requiredPassword, passwordValidate]}
        />
        <Field
          name="repeatPassword"
          type="password"
          prefix={<LockOutlined />}
          classes="form__password"
          placeholder="Повторите пароль"
          component={Input}
          validate={[requiredPassword, repeatePasswordValidate]}
        />
        <button type="submit" className="auth__button auth__button-active">
          Зарегистрироваться
        </button>
      </form>
    );
  }
}

let RegistrationReduxForm = reduxForm({
  form: "registration",
})(RegistrationForm);

export default RegistrationReduxForm;
