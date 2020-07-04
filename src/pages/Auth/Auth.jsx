import React from "react";
import "./Auth.scss";
import { Route, withRouter } from "react-router-dom";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import { connect } from "react-redux";

const Auth = props => {
  return (
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
          return <Registration />;
        }}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    login: state.auth.login,
    email: state.auth.email,
    id: state.auth.id,
    isAuth: state.auth.isAuth,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
