import React from "react";
import { reduxForm } from "redux-form";
import { UsersApi } from "../../../api/api";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import { isLoginUserAction } from "../../../redux/login-reducer";

class AuthFormWrapper extends React.Component {
  componentDidMount() {
    this.props.isLoginUserAction(sessionStorage["userEmail"]);
  }

  submit = values => {
    UsersApi.loginUser(values);
  };
  render() {
    // isLogin ? <Redirect to="/im" />;
    return <LoginForm handleSubmit={this.props.handleSubmit} submit={this.submit} />;
  }
}

let AuthReduxForm = reduxForm({
  form: "Auth",
})(AuthFormWrapper);

function mapStateToProps(state) {
  return {
    login: state.login.login,
    email: state.login.email,
    id: state.login.id,
    isAuth: state.login.isAuth,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     : email => {
//       return dispatch({
//         type: "LOGIN_USER",
//       });
//     },
//   };
// }

export default withRouter(connect(mapStateToProps, { isLoginUserAction })(AuthReduxForm));
