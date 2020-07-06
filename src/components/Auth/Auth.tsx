import React, { useEffect } from "react";
import "./Auth.scss";
import { Route, withRouter, Redirect } from "react-router-dom";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import { setIsLoginUserAction, setLoginUserAction } from "../../redux/login-reducer";
import { connect } from "react-redux";

interface AuthTypes {
  setIsLoginUserAction: Function;
  setLoginUserAction: Function;
  isAuth: Boolean;
  isSuccess: Boolean;
}

const Auth = (props: AuthTypes) => {
  useEffect(() => {
    props.setIsLoginUserAction(sessionStorage["userEmail"]);
  }, [props, props.isAuth]);

  return props.isAuth ? (
    <Redirect to="/im" />
  ) : (
    <div className="auth">
      <Route
        exact
        path="/"
        render={() => {
          return <Login />;
        }}
      />
      <Route
        exact
        path="/registration"
        render={() => {
          return <Registration isSuccess={props.isSuccess} />;
        }}
      />
    </div>
  );
};

function mapStateToProps(state: Storage) {
  return {
    isAuth: state.login.isAuth,
    isSuccess: state.registration.isSuccess,
  };
}

export default withRouter(
  connect(mapStateToProps, { setIsLoginUserAction, setLoginUserAction })(Auth)
);
