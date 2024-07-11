import { applyMiddleware, combineReducers, compose } from "redux";
import { legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import { reducer as Auth } from "./Auth/reducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({ Auth });
const Reduxstore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export { Reduxstore };