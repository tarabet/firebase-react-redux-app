import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import counter from "./counter";
import auth from "./auth";
import items from "./items";

export default combineReducers({
    routing: routerReducer,
    counter,
    auth,
    items,
})