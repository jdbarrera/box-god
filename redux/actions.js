import { 
  SET_POINTS,
  SET_LIVES,
  USER_ACTION,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,  
} from "./actionTypes";
import {loginUserAPI, logoutUserAPI, validateUserAPI} from '../beogAPI/beogAPI';

export const userAction = () => ({
  type: USER_ACTION,
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
  dispatch(userAction());

  try {
    const loginResponse = await loginUserAPI(userDets);
    console.log(loginResponse);
    if (loginResponse.success === false) {
      console.log('fail');
      dispatch(loginUserFailure(loginResponse.data.message));          
    } else {
      const jwt = loginResponse.data.data.jwt;
      dispatch(validateUserBeog(jwt));  
    }    
  } catch (error) {
    dispatch(loginUserFailure(error));
  }
}

export const validateUserBeog = (jwt) => async dispatch => {
  try {
    const userResponse = await validateUserAPI(jwt);
    const user = userResponse.data.data;
    console.log('validatesuccess');
    dispatch(loginUserSuccess(user));
  } catch (error) {
    dispatch(loginUserFailure(error));
  }
}

export const logoutUserBeog = (token) => async dispatch => {
  dispatch(userAction());
  
  try {
    const logoutResponse = await logoutUserAPI(token);
    dispatch(logoutUserSuccess());
  } catch (error) {
    dispatch(logoutUserFailure(error));
  }
}

export const setPoints = points => ({ type: SET_POINTS, payload: { points } });

export const setLives = lives => ({ type: SET_LIVES, payload: { lives } });