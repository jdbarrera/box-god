import { 
    SET_SCORE,
    } from "./actionTypes";
  
  export const setScore = score => ({ type: SET_SCORE, payload: { score } });