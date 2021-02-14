import React from "react";

const Login = () => {
  return (
    <section className="login">
      <h1>Login into account</h1>
      <p>Please fill in your account's data</p>
      <form action="get" className="login__form">
        <input type="text" />
        <input type="password" />
      </form>
      <button className="login__button">Login into account</button>
      <a href="#registration" className="login__to-registration">
        Go to registration
      </a>
    </section>
  );
};

export default Login;
