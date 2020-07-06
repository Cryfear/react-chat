import { stopSubmit } from "redux-form";
import { UsersApi } from "../api/api";

const LOGIN_USER = "LOGIN_USER";

let initialState = {
  login: null,
  email: null,
  id: null,
  isAuth: false,
};

const loginAction = (state = { ...initialState }, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        isAuth: true,
        login: action.login,
        email: action.userEmail,
        id: action.id,
      };
    }

    default:
      return { ...state };
  }
};

export const loginUserAction = (login, userEmail, id) => ({
  type: LOGIN_USER,
  userEmail,
  login,
  id,
});

export const setIsLoginUserAction = email => {
  return async dispatch => {
    let response = await UsersApi.isLoginNow(email);

    const { fullName, email: userEmail, id } = response.data;

    if (response.data.responseCode === "success") {
      dispatch(loginUserAction(fullName, userEmail, id));
    } else {
      let action = stopSubmit("login", { _error: response.data.responseCode });
      dispatch(action);
    }
  };
};

export const setLoginUserAction = values => {
  return async dispatch => {
    let response = await UsersApi.loginUser(values);
    console.log(response.data);
    const { fullName, email, id } = response.data;

    if (response.data.responseCode === "success") {
      dispatch(loginUserAction(fullName, email, id));
    } else {
      let action = stopSubmit("login", { _error: response.data.responseCode });
      dispatch(action);
    }
  };
};

export default loginAction;
