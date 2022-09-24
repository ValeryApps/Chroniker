import authReducer from "./authReducer";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { profileReducer } from "./profileReducer";
import { postReducer } from "./postReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  profile: profileReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
