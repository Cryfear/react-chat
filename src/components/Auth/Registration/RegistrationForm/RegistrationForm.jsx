import React from "react";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Field, reduxForm } from "redux-form";
import { Input } from "../../../../components/Input/Input";
import {
  required,
  requiredPassword,
  emailValidate,
  passwordValidate,
  repeatePasswordValidate,
} from "../../../../assets/validations";
import { connect } from "react-redux";
import { createUser } from "../../../../redux/registration-reducer";

class RegistrationForm extends React.Component {
  submit = (values) => {
    this.props.createUser(values.email, values.username, values.password);
  };

  render() {
    // console.log(this.props.error); // если вдруг регистрация не прошла, здесь будет ошибка
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
        {this.props.error ? (
          <div style={{ marginTop: "-18px" }}>E-Mail занят!</div>
        ) : null}
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

export default connect(
  (state) => ({
    isSuccess: state.registration.isSuccess,
  }),
  { createUser }
)(RegistrationReduxForm);
