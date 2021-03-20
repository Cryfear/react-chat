import React from "react";
import { Field, Form } from "formik";

import "./Login.scss";

import { passwordValidate } from "../../../utils/validations";
import { Link } from "react-router-dom";
import { LoginTypes } from "./LoginContainer";

export const Login = ({ errors, handleChange, values, touched }: LoginTypes) => {
  return (
    <section className="login">
      <h1>Login into account</h1>
      <p>Please fill in your account's data</p>
      <Form action="get" className="login__form">
        <Field
          className={errors.email && touched.email ? "input__error" : ""}
          placeholder="E-Mail"
          name="email"
          type="text"
          onChange={handleChange}
          value={values.email}
        />
        <div className="form__errors">{errors.email && touched.email ? errors.email : ""}</div>
        <Field
          className={errors.password && touched.password ? "input__error" : ""}
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={values.password}
          validate={passwordValidate}
        />
        <div className="form__errors">{errors.password && touched.password ? errors.password : ""}</div>
        <button type="submit" className="login__button">
          Login
        </button>
      </Form>
      <Link to="/registration" className="login__to-registration">
        Go to registration
      </Link>
    </section>
  );
};
