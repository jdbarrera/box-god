import { 
  SET_POINTS,
  SET_LIVES,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,  
} from "./actionTypes";
import {loginUserAPI, logoutUserAPI, validateUserAPI} from '../beogAPI/beogAPI';

export const loginUser = () => ({
  type: LOGIN_USER,
});

export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

export const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});

export const logoutUserFailure = (error) => ({
  type: LOGOUT_USER_FAILURE,
  payload: error,
});

export const loginUserBeog = (userDets) => async dispatch => {
  dispatch(loginUser());

  try {
    const loginResponse = await loginUserAPI(userDets);
    const jwt = loginResponse.data.data.jwt;
    const userResponse = await validateUserAPI(jwt);
    const user = userResponse.data.data;

    dispatch(loginUserSuccess(user));
  } catch (error) {
    console.log(error);
    dispatch(loginUserFailure(error));
  }
}

export const logoutUserBeog = (token) => async dispatch => {
  try {
    const logoutResponse = await logoutUserAPI(token);
    console.log(logoutResponse);
    dispatch(logoutUserSuccess());
  } catch (error) {
    console.log(error);
    dispatch(logoutUserFailure(error));
  }
}

export const setPoints = points => ({ type: SET_POINTS, payload: { points } });

export const setLives = lives => ({ type: SET_LIVES, payload: { lives } });