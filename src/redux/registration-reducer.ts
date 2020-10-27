import UsersApi from "../api/usersApi";
import { stopSubmit } from "redux-form";
import { Dispatch } from "redux";

const TRUE_SUCCESS = "TRUE_SUCCESS";

let initialState = {
  isSuccess: false,
};

interface registrationAction {
  isSuccess: Boolean;
  type: string;
}

const registrationAction = (
  state = { ...initialState },
  action: registrationAction
) => {
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

export const createUser = (
  email: string,
  fullName: string,
  password: string
) => {
  return async (dispatch: Dispatch) => {
    let response = await UsersApi.createUser(email, fullName, password);
    if (response.data.responseCode === "success") {
      dispatch(createUserAction());
    } else {
      let action = stopSubmit("registration", {
        _error: response.data.responseCode,
      });
      dispatch(action);
    }
  };
};

export default registrationAction;
