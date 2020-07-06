import React from "react";
import { reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";

const AuthFormWrapper = props => {
  const submit = values => {
    props.setLoginUserAction(values);
  };
  return props.isAuth ? (
    <Redirect to="/im" />
  ) : (
    <LoginForm handleSubmit={props.handleSubmit} submit={submit} />
  );
};

let AuthReduxForm = reduxForm({
  form: "Auth",
})(AuthFormWrapper);

export default AuthReduxForm;
