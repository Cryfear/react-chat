import React from "react";
import { Field, FormikProps } from "formik";

import "./Login.scss";

import { passwordValidate } from "../../../utils/validations";
import { Link, Navigate } from "react-router-dom";
import { useUnit } from "effector-react";
import { $LoginStore, LoginFx } from "../../../store/Login.model";
import { FormDataTypes } from "../../../types/Auth.types";


export const Login= ({ errors, handleChange, values, touched }: FormikProps<FormDataTypes>) => {
  const { isCorrectLogin, isAuth } = useUnit($LoginStore);

  const passwordErrors =
    isCorrectLogin === false
      ? "Invalid Login Or Password" // если пользователь ввел неправильно логин или пароль
      : errors.password && touched.password // иначе вывести ошибку из формика если прикоснулся
      ? errors.password
      : "";

  const emailIsErrorClassName = errors.email && touched.email ? "input__error" : touched.email && "input__valid";

  // при классе input__valid добавляется галочка к полю, поэтому нужна проверка на touched

  const passwordIsErrorClassName = errors.password && touched.password ? "input__error" : touched.password && "input__valid";

  const emailErrors = errors.email && touched.email ? errors.email : "";

  return isAuth ? (
    <Navigate to="/home" />
  ) : (
    <section className="login">
      <h1>Login into account</h1>
      <p>Please fill in your account's data</p>
      <form action="post" className="login__form">
        <div className={emailIsErrorClassName ? emailIsErrorClassName : ''}>
          <Field
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" || e.key === "NumpadEnter") LoginFx({ email: values.email, password: values.password });
            }}
            placeholder="E-Mail"
            name="email"
            type="text"
            onChange={handleChange}
            value={values.email}
          />
        </div>
        <div className="form__errors">{emailErrors}</div>
        <div className={passwordIsErrorClassName ? passwordIsErrorClassName: ''}>
          <Field
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" || e.key === "NumpadEnter") LoginFx({ email: values.email, password: values.password });
            }}
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            validate={passwordValidate}
          />
        </div>
        <div className="form__errors">{passwordErrors}</div>
        <button onClick={() => LoginFx({ email: values.email, password: values.password })} type="button" className="login__button">
          Login
        </button>
      </form>
      <Link to="/auth/registration" className="login__to-registration">
        Go to registration
      </Link>
    </section>
  );
};
