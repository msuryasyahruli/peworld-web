import { combineReducers } from "redux";
import userReducer from "./userReducer";
import experienceReducer from "./experienceReducer";
import portfolioReducer from "./portfolioReducer";

const rootReducer = combineReducers({
  user: userReducer,
  experience: experienceReducer,
  portfolio: portfolioReducer,
});

export default rootReducer;