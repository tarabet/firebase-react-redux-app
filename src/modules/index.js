import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import counter from "./counter";
import auth from "./auth";
import items from "./items";
import loading from "./loading";

export default combineReducers({
    routing: routerReducer,
    counter,
    auth,
    items,
    loading,
})