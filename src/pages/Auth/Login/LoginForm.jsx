import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input } from "../../../components/Input/Input";
import { Field, reduxForm } from "redux-form";

const AuthForm = () => {
  return (
    <div className="auth__form">
      <form name="normal_login">
        <Field
          name="username"
          type="text"
          prefix={<UserOutlined />}
          classes="form__username"
          placeholder="Username"
          component={Input}
        />
        <Field
          name="password"
          type="password"
          prefix={<LockOutlined />}
          classes="form__username"
          placeholder="Password"
          component={Input}
        />
      </form>
    </div>
  );
};

let AuthReduxForm = reduxForm({
  form: "Auth",
})(AuthForm);

export default AuthReduxForm;
