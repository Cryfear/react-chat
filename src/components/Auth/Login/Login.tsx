import React from "react";
import { useFormik } from "formik";

import "./Login.scss";

import { LoginFx } from "./Login.model";

export const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      let sex = await LoginFx({ email: values.email, password: values.password });
      console.log(sex);
    },
  });

  return (
    <section className="login">
      <h1>Login into account</h1>
      <p>Please fill in your account's data</p>
      <form onSubmit={formik.handleSubmit} action="get" className="login__form">
        <input
          placeholder="E-Mail"
          name="email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button type="submit" className="login__button">
          Login
        </button>
      </form>
      <a href="#registration" className="login__to-registration">
        Go to registration
      </a>
    </section>
  );
};
