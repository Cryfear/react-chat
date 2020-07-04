import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import ThunkMiddleware from "redux-thunk";
import authAction from "./auth-reducer";

const rootReducer = combineReducers({
  form: formReducer,
  auth: authAction,
});

const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));

window.store = store;

export default store;
