import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import ThunkMiddleware from "redux-thunk";
import loginAction from "./login-reducer";
import registrationAction from "./registration-reducer";

const rootReducer = combineReducers({
  form: formReducer,
  login: loginAction,
  registration: registrationAction,
});

const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));

window.store = store;

export default store;
