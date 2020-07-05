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
        ...action.user,
        isAuth: true,
      };
    }

    default:
      return { ...state };
  }
};

export const loginUserAction = () => ({
  type: LOGIN_USER,
});

export const isLoginUserAction = email => {
  return async dispatch => {
    let response = await UsersApi.isLoginNow(email);
    console.log(response);
    if (response.data.resultCode === "success") {
      dispatch(loginUserAction());
    } else {
      console.log(response);
      let action = stopSubmit("login", { _error: "error" });
      dispatch(action);
    }
  };
};

// export const loginUser = (email, password, remember) => {
//   return async dispatch => {
//     let response = await AuthApi.login(email, password, remember);
//     if (response.resultCode === 0) {
//       dispatch(loginUserAction());
//     } else {
//       let action = stopSubmit("login", { _error: response.messages[0] });
//       dispatch(action);
//     }
//   };
// };

export default loginAction;
