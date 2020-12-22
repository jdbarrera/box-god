import { combineReducers } from "redux";
import score from "./score";
import user from "./user";

export default combineReducers({ score, user });