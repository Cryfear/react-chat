import React from "react";

import "./Login.scss";

const Login = () => {
  return (
    <section className="login">
      <h1>Login into account</h1>
      <p>Please fill in your account's data</p>
      <form action="get" className="login__form">
        <input placeholder="E-Mail" type="text" />
        <input placeholder="Password" type="password" />
      </form>
      <button className="login__button">Login</button>
      <a href="#registration" className="login__to-registration">
        Go to registration
      </a>
    </section>
  );
};

export default Login;
