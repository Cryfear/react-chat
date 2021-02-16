import React from "react";
import { Link } from "react-router-dom";

import "./RegistrationForm.scss";

const RegistratationForm = () => {
  return (
    <div>
      <form action="post" className="registration__form">
        <input type="text" placeholder="E-Mail" />
        <input type="text" placeholder="Name" />
        <input type="password" placeholder="Create password" />
        <input type="password" placeholder="Repeat password" />
      </form>
      <button className="registration__button">Registration</button>
      <Link to="/login" className="registration__to-login">
        I already have an account
      </Link>
    </div>
  );
};

export default RegistratationForm;
