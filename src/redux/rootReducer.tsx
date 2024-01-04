import { combineReducers } from "redux";
import test from "./reducers/test";
import setting from "./reducers/setting";
import user from "./reducers/user";

import disease from "./reducers/chronicdisease";

const rootReducer = combineReducers({
  test,
  setting,
  user,
  disease,
});
export default rootReducer;
