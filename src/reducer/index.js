import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import loggedReducer from "./isLogged";

const allReducer = combineReducers({  
    logged: loggedReducer,
    counter: counterReducer
});

export default allReducer;