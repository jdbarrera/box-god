import { 
  SET_POINTS,
  SET_LIVES,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE, 
} from "./actionTypes";
import {loginUserAPI} from '../beogAPI/beogAPI';

export const loginUser = () => ({
  type: LOGIN_USER,
});

export const loginUserSuccess = (response) => ({
  type: LOGIN_USER_SUCCESS,
  payload: response,
});

export const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

export const loginUserBeog = (userDets) => async dispatch => {
  dispatch(loginUser());

  try {
    const response = await loginUserAPI(userDets);
    dispatch(loginUserSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(loginUserFailure(error));
  }
}

export const setPoints = points => ({ type: SET_POINTS, payload: { points } });

export const setLives = lives => ({ type: SET_LIVES, payload: { lives } });