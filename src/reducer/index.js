import { combineReducers } from "redux";
import isActive from "./isLogged";

const rootReducer = combineReducers({isActive});

export default rootReducer;