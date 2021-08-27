import React from "react";
import SuccessRegistration from "./SuccessRegistration/SuccessRegistration";
import { RegistrationFormContainer } from "./RegistrationForm/RegistrationFormContainer";

import "./Registration.scss";

export const Registratation = () => {
  return (
    <section className="registration">
      <h1>Registration</h1>
      <p>For using chat you need to be registrated</p>
      {true ? <RegistrationFormContainer /> : <SuccessRegistration />}
    </section>
  );
};
