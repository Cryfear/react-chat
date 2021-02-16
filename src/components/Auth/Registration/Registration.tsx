import React from "react";
import RegistratationForm from "./RegistrationForm/RegistrationForm";
import SuccessRegistration from "./SuccessRegistration/SuccessRegistration";

import "./Registration.scss";

const Registratation = () => {
  return (
    <section className="registration">
      <h1>Registration</h1>
      <p>For using chat you need be registrated</p>
      {false ? <RegistratationForm /> : <SuccessRegistration />}
    </section>
  );
};

export default Registratation;
