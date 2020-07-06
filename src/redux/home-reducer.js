import { UsersApi } from "../api/api";

const SET_PAGE = "SET_PAGE";
const SET_ACTIVE_DIALOG = "SET_ACTIVE_DIALOG";
const SET_SEARCH = "SET_SEARCH";
const SET_USERS = "";

let initialState = {
  dialogs: [], // массив диалогов
  users: [], // массив юзеров в поиске
  activeDialog: "", // айди пользователя с кем ведется диалог
  searchPage: 0, // страница поиска, поиск идет по 10 пользователей
  isSearch: false, // состояние поиска новых пользователей
};

const HomeAction = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_USERS: {
      return {
        ...state,
        users: [...state.users.concat(action.users)],
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
        activeDialog: action.id,
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

export const activeDialogAction = id => ({
  type: SET_ACTIVE_DIALOG,
  id,
});

export const setActiveDialogAction = id => {
  return async dispatch => {
    dispatch(activeDialogAction(id));
  };
};

export const searchPageAction = () => ({
  type: SET_PAGE,
});

export const setSearchPageAction = () => {
  return async dispatch => {
    dispatch(searchPageAction());
  };
};

export const isSearchAction = () => ({
  type: SET_SEARCH,
});

export const setIsSearchAction = () => {
  return async dispatch => {
    dispatch(isSearchAction());
  };
};

export const usersAction = users => ({
  type: SET_USERS,
  users,
});

export const getUsersAction = page => {
  return async dispatch => {
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
