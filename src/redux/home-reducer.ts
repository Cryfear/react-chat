import { UsersApi, DialogsApi, MessagesApi } from "../api/api";
import { Dispatch } from "redux";
import { StateTypes, HomeActions } from "../components/Home/HomeTypes";

const SET_PAGE = "SET_PAGE";
const SET_ACTIVE_DIALOG = "SET_ACTIVE_DIALOG";
const SET_SEARCH = "SET_SEARCH";
const SET_USERS = "";
const SET_DIALOGS = "SET_DIALOGS";
const CREATE_DIALOG = "CREATE_DIALOG";
const SET_MESSAGES = "SET_MESSAGES";
const ADD_MESSAGES = "ADD_MESSAGES";

let initialState: StateTypes = {
  dialogs: [], // массив диалогов
  users: [], // массив юзеров в поиске
  messages: [], // массив сообщений активного диалога
  activeDialog: "", // айди пользователя с кем ведется диалог, в свою очередь айди собеседника
  searchPage: 0, // страница поиска, поиск идет по 10 пользователей
  isSearch: false, // состояние поиска новых пользователей
};

const HomeAction = (state = { ...initialState }, action: HomeActions) => {
  switch (action.type) {
    case SET_MESSAGES: {
      // создаем или добавляем в массив сообщений сообщения
      return {
        ...state,
        messages: action.messages,
      };
    }
    case ADD_MESSAGES: {
      return {
        ...state,
        messages: [...state.messages, action.messages],
      };
    }
    case CREATE_DIALOG: {
      // создание диалога с новым пользователем
      return {
        ...state,
        activeDialog: action.dialogId,
      };
    }
    case SET_USERS: {
      // создаем или добавляем новых пользователей
      return {
        ...state,
        users: [...state.users.concat(action.users)],
      };
    }
    case SET_DIALOGS: {
      // наш массив диалогов
      return {
        ...state,
        dialogs: [...state.dialogs, action.dialogs],
      };
    }
    case SET_PAGE: {
      // добавляем единицу при скролле, для загрузки новых пользователей
      return {
        ...state,
        searchPage: state.searchPage + 1,
      };
    }
    case SET_ACTIVE_DIALOG: {
      // активный диалог, собственно является id собеседника
      return {
        ...state,
        activeDialog: action.dialogId,
        messages: [],
      };
    }
    case SET_SEARCH: {
      // состояние поиска новых пользователей
      return {
        ...state,
        isSearch: !state.isSearch,
      };
    }
    default:
      return { ...state };
  }
};

export const createDialogAction = (id: string, myId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(activeDialogAction(id));
    const dialog = await DialogsApi.createDialog(myId, id);
    // если дата success, то диалог уже есть и мы вернем сообщения
    console.log(dialog);
    if (dialog.data !== "success") {
      dispatch(messagesAction(dialog.data));
    }
  };
};

export const getMessagesAction = (dialogId: string, myId: string) => {
  return async (dispatch: Dispatch) => {
    const messages = await MessagesApi.getDialogMessages(dialogId, myId);
    if (messages.data !== "error!") {
      console.log(messages);
      dispatch(messagesAction(messages.data));
    }
  };
};

export const createMessageAction = (dialogId: string, myId: string, value: string) => {
  return async (dispatch: Dispatch) => {
    const messages: any = await MessagesApi.createMessage(dialogId, myId, value);
    dispatch(addMessagesAction(messages.data));
  };
};

export const addMessagesAction = (messages: Array<any>) => ({
  type: ADD_MESSAGES,
  messages,
});

export const dialogsAction = (dialogs: Array<any>) => ({
  type: SET_DIALOGS,
  dialogs,
});

export const messagesAction = (messages: Array<any>) => ({
  type: SET_MESSAGES,
  messages,
});

export const setDialogsAction = (dialogs: Array<any>) => {
  return async (dispatch: Dispatch) => {
    dispatch(dialogsAction(dialogs));
  };
};

export const activeDialogAction = (dialogId: string) => ({
  type: SET_ACTIVE_DIALOG,
  dialogId,
});

export const setActiveDialogAction = (id: string) => {
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

export const getUsersAction = (page: number) => {
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
