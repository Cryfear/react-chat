import { setAuthUser } from "./auth-reducer";
import { UsersApi } from "../api/api";

const IS_INITIALIZED = "IS_INITIALIZED";

let initialState = {
  initialized: false,
};

let appAction = (state = { ...initialState }, action) => {
  switch (action.type) {
    case IS_INITIALIZED: {
      return {
        ...state,
        initialized: true,
      };
    }

    default:
      return { ...state };
  }
};

export const initializedCreater = () => {
  return { type: IS_INITIALIZED };
};

export const initializedSuccess = () => {
  return async dispatch => {
    let data = await myProfileApi.getMe();
    if (data.login) {
      dispatch(setAuthUser(data));
    }
    dispatch(initializedCreater());
  };
};

export default appAction;
