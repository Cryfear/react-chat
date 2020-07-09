import { stopSubmit } from "redux-form";
import { UsersApi } from "../api/api";
import { Dispatch } from "redux";

const LOGIN_USER = "LOGIN_USER";

let initialState = {
  login: null,
  email: null,
  id: null,
  isAuth: false,
};

interface loginAction {
  type: string;
  login: string;
  userEmail: string;
  id: string;
}

const loginAction = (state = { ...initialState }, action: loginAction) => {
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

export const loginUserAction = (login: string, userEmail: string, id: string) => ({
  type: LOGIN_USER,
  userEmail,
  login,
  id,
});

export const setIsLoginUserAction = (email: string) => {
  return async (dispatch: Dispatch) => {
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

export const setLoginUserAction = (values: any) => {
  return async (dispatch: Dispatch) => {
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
