import { useStore } from "effector-react";
import { Field, Form } from "formik";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { $RegistrationStore } from "../Registration.model";

import "./RegistrationForm.scss";
import { RegistrationTypes } from "./RegistrationFormContainer";

export const RegistrationForm = ({ errors, touched, handleChange, values }: RegistrationTypes) => {
  const store = useStore($RegistrationStore);

  return store.isRegistrated ? <Redirect to="/auth/login" /> :(
    <div>
      <Form action="post" className="registration__form">
        <div className={errors.email && touched.email ? "input__error" : touched.email && "input__valid"}>
          <Field placeholder="E-Mail" name="email" type="text" onChange={handleChange} value={values.email} />
        </div>
        <div className="form__errors">{errors.email && touched.email ? errors.email : ""}</div>
        <div className={errors.name && touched.name ? "input__error" : touched.name && "input__valid"}>
          <Field placeholder="Name" name="name" type="text" onChange={handleChange} value={values.name} />
        </div>
        <div className="form__errors">{errors.name && touched.name ? errors.name : ""}</div>
        <div
          className={
            errors.password && touched.password ? "input__error" : touched.password && "input__valid"
          }
        >
          <Field
            placeholder="Create password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
          />
        </div>
        <div className="form__errors">{errors.password && touched.password ? errors.password : ""}</div>
        <div
          className={
            errors.passwordRepeat && touched.passwordRepeat
              ? "input__error"
              : touched.passwordRepeat && "input__valid"
          }
        >
          <Field
            placeholder="Repeat password"
            name="passwordRepeat"
            type="password"
            onChange={handleChange}
            value={values.passwordRepeat}
          />
        </div>
        <div className="form__errors">
          {errors.passwordRepeat && touched.passwordRepeat ? errors.passwordRepeat : ""}
        </div>
        <button type="submit" className="registration__button">
          Registration
        </button>
      </Form>
      <Link to="/auth/login" className="registration__to-login">
        I already have an account
      </Link>
    </div>
  );
};
