import React from "react";

import "./SuccessRegistration.scss";
import warnSvg from "../../../../assets/warn-email.svg";

const SuccessRegistration = () => {
  return (
    <div className="registration__success">
      <img src={warnSvg} alt="warning icon" />
      <h2>Verify your account</h2>
      <p>Link with confirmation must be already at your E-Mail</p>
    </div>
  );
};

export default SuccessRegistration;
