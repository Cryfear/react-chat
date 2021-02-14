import React from "react";
import RegistratationForm from "./RegistrationForm/RegistrationForm";
import SuccessRegistration from "./SuccessRegistration/SuccessRegistration";

const Registratation = () => {
  return (
    <section className="registration">
      <h1>Registration</h1>
      <p>For using chat you need be registrated</p>
      {true ? <RegistratationForm /> : <SuccessRegistration />}
    </section>
  );
};

export default Registratation;
