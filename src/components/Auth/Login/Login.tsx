import React from "react";
import { Field, Form } from "formik";

import "./Login.scss";

import { passwordValidate } from "../../../utils/validations";
import { Link, Redirect } from "react-router-dom";
import { LoginTypes } from "./LoginContainer";
import { useStore } from "effector-react";
import { $LoginStore } from "./Login.model";

export const Login = ({ errors, handleChange, values, touched }: LoginTypes) => {
  const store = useStore($LoginStore);
  return store.isAuth ? (
    <Redirect to="/home" />
  ) : (
    <section className="login">
      <h1>Login into account</h1>
      <p>Please fill in your account's data</p>
      <Form action="post" className="login__form">
        <div className={errors.email && touched.email ? "input__error" : touched.email && "input__valid"}>
          <Field placeholder="E-Mail" name="email" type="text" onChange={handleChange} value={values.email} />
        </div>
        <div className="form__errors">{errors.email && touched.email ? errors.email : ""}</div>
        <div
          className={
            errors.password && touched.password ? "input__error" : touched.password && "input__valid"
          }
        >
          <Field
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            validate={passwordValidate}
          />
        </div>
        <div className="form__errors">{errors.password && touched.password ? errors.password : ""}</div>
        <button type="submit" className="login__button">
          Login
        </button>
      </Form>
      <Link to="/auth/registration" className="login__to-registration">
        Go to registration
      </Link>
    </section>
  );
};
