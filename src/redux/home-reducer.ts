import { UsersApi, DialogsApi } from "../api/api";
import { Dispatch } from "redux";
import { StateTypes } from "../components/Home/HomeTypes";

const SET_PAGE = "SET_PAGE";
const SET_ACTIVE_DIALOG = "SET_ACTIVE_DIALOG";
const SET_SEARCH = "SET_SEARCH";
const SET_USERS = "";
const SET_DIALOGS = "SET_DIALOGS";
const CREATE_DIALOG = "CREATE_DIALOG";

let initialState: StateTypes = {
  dialogs: [], // массив диалогов
  users: [], // массив юзеров в поиске
  activeDialog: "", // айди пользователя с кем ведется диалог
  searchPage: 0, // страница поиска, поиск идет по 10 пользователей
  isSearch: false, // состояние поиска новых пользователей
};

interface Actions {
  type: String;
  users: Array<any>;
  dialogId: String;
  dialogs: Array<any>;
}

const HomeAction = (state = { ...initialState }, action: Actions) => {
  switch (action.type) {
    case CREATE_DIALOG: {
      return {
        ...state,
        activeDialog: action.dialogId,
      };
    }
    case SET_USERS: {
      return {
        ...state,
        users: [...state.users.concat(action.users)],
      };
    }
    case SET_DIALOGS: {
      return {
        ...state,
        dialogs: [...state.dialogs, action.dialogs],
      };
    }
    case SET_PAGE: {
      return {
        ...state,
        searchPage: state.searchPage + 1,
      };
    }
    case SET_ACTIVE_DIALOG: {
      return {
        ...state,
        activeDialog: action.dialogId,
      };
    }
    case SET_SEARCH: {
      return {
        ...state,
        isSearch: !state.isSearch,
      };
    }
    default:
      return { ...state };
  }
};

export const createDialogAction = (id: String, myId: String) => {
  return async (dispatch: Dispatch) => {
    dispatch(activeDialogAction(id));
    const dialog = await DialogsApi.createDialog(myId, id);
    console.log(dialog);
  };
};

export const dialogsAction = (dialogs: Array<any>) => ({
  type: SET_DIALOGS,
  dialogs,
});

export const setDialogsAction = (dialogs: Array<any>) => {
  return async (dispatch: Dispatch) => {
    dispatch(dialogsAction(dialogs));
  };
};

export const activeDialogAction = (dialogId: String) => ({
  type: SET_ACTIVE_DIALOG,
  dialogId,
});

export const setActiveDialogAction = (id: String) => {
  return async (dispatch: Dispatch) => {
    dispatch(activeDialogAction(id));
  };
};

export const searchPageAction = () => ({
  type: SET_PAGE,
});

export const setSearchPageAction = () => {
  return async (dispatch: Dispatch) => {
    dispatch(searchPageAction());
  };
};

export const isSearchAction = () => ({
  type: SET_SEARCH,
});

export const setIsSearchAction = () => {
  return async (dispatch: Dispatch) => {
    dispatch(isSearchAction());
  };
};

export const usersAction = (users: Array<Object>) => ({
  type: SET_USERS,
  users,
});

export const getUsersAction = (page: Number) => {
  return async (dispatch: Dispatch<any>) => {
    const data = await UsersApi.getUsers(page);
    if (data?.data.length > 0) {
      dispatch(setSearchPageAction());
      dispatch(usersAction(data.data));
      return data.data;
    }
  };
};

// export const loginUserAction = (login, userEmail, id) => ({
//   type: LOGIN_USER,
//   userEmail,
//   login,
//   id,
// });

// export const isLoginUserAction = email => {
//   return async dispatch => {
//     let response = await UsersApi.isLoginNow(email);

//     const { fullName, email: userEmail, id } = response.data;

//     if (response.data.responseCode === "success") {
//       dispatch(loginUserAction(fullName, userEmail, id));
//     } else {
//       let action = stopSubmit("login", { _error: response.data.responseCode });
//       dispatch(action);
//     }
//   };
// };

export default HomeAction;
