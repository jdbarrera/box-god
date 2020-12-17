import { 
  SET_POINTS,
  SET_LIVES
  } from "./actionTypes";

export const setPoints = points => ({ type: SET_POINTS, payload: { points } });

export const setLives = lives => ({ type: SET_LIVES, payload: { lives } });