import React from "react";
import { Field } from "formik";

import "./Login.scss";

import { passwordValidate } from "../../../utils/validations";
import { Link, Redirect } from "react-router-dom";
import { LoginTypes } from "./LoginContainer";
import { useStore } from "effector-react";
import { $LoginStore, LoginFx } from "./Login.model";

export const Login = ({
  errors,
  handleChange,
  values,
  touched,
}: LoginTypes) => {
  const store = useStore($LoginStore);

  const passwordErrors =
    store.isCorrectLogin === false
      ? "Invalid Login Or Password" // если пользователь ввел неправильно логин или пароль
      : errors.password && touched.password // иначе вывести ошибку из формика если прикоснулся
      ? errors.password
      : "";

  const emailIsErrorClassName =
    errors.email && touched.email
      ? "input__error"
      : touched.email && "input__valid";

  // при классе input__valid добавляется галочка к полю, поэтому нужна проверка на touched

  const passwordIsErrorClassName =
    errors.password && touched.password
      ? "input__error"
      : touched.password && "input__valid";

  const emailErrors = errors.email && touched.email ? errors.email : "";

  return store.isAuth ? (
    <Redirect to="/home" />
  ) : (
    <section className="login">
      <h1>Login into account</h1>
      <p>Please fill in your account's data</p>
      <form action="post" className="login__form">
        <div className={emailIsErrorClassName}>
          <Field
            placeholder="E-Mail"
            name="email"
            type="text"
            onChange={handleChange}
            value={values.email}
          />
        </div>
        <div className="form__errors">{emailErrors}</div>
        <div className={passwordIsErrorClassName}>
          <Field
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            validate={passwordValidate}
          />
        </div>
        <div className="form__errors">{passwordErrors}</div>
        <button
          onClick={() =>
            LoginFx({ email: values.email, password: values.password })
          }
          onKeyDown={(e: any) => {
            if (e.key === "Enter" || e.key === "NumpadEnter")
              LoginFx({ email: values.email, password: values.password });
          }}
          type="button"
          className="login__button"
        >
          Login
        </button>
      </form>
      <Link to="/auth/registration" className="login__to-registration">
        Go to registration
      </Link>
    </section>
  );
};
