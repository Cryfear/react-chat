import { UsersApi } from "../api/api";
import { stopSubmit } from "redux-form";

const TRUE_SUCCESS = "TRUE_SUCCESS";

let initialState = {
  isSuccess: false,
};

const registrationAction = (state = { ...initialState }, action) => {
  switch (action.type) {
    case TRUE_SUCCESS: {
      return { ...state, isSuccess: true };
    }
    default:
      return { ...state };
  }
};

export const createUserAction = () => ({
  type: TRUE_SUCCESS,
});

export const createUser = (email, fullName, password) => {
  return async dispatch => {
    let response = await UsersApi.createUser(email, fullName, password);
    if (response.data.responseCode === "success") {
      dispatch(createUserAction());
    } else {
      let action = stopSubmit("registration", { _error: response.data.responseCode });
      dispatch(action);
    }
  };
};

export default registrationAction;
