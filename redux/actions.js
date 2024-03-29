import { 
  SET_POINTS,
  SET_LIVES,
  SET_HISCORE,
  SET_PURCHASED_PASS,
  SCORE_ERROR,
  SCORE_ACTION,
  USER_ACTION,
  REFRESH_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
} from "./actionTypes";

import {
  loginUserAPI, 
  logoutUserAPI, 
  validateUserAPI,
  getUserMetaAPI,
  updateHighScoreAPI,
  refreshUserAPI,
  createUserAPI,
} from '../beogAPI/beogAPI';
import { create } from "mathjs";

export const userAction = () => ({
  type: USER_ACTION,
});

export const scoreAction = () => ({
  type: SCORE_ACTION,
});

export const scoreError = (error) => ({
  type: SCORE_ERROR,
  payload: error,
});

export const refreshUser = (token) => ({
  type: REFRESH_USER,
  payload: token,
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
    if (loginResponse.success === false) {
      dispatch(loginUserFailure(loginResponse.data.message));          
    } else {
      const jwt = loginResponse.data.data.jwt;
      dispatch(getUserMetaBeog(jwt));
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
    dispatch(loginUserSuccess(user));
  } catch (error) {
    dispatch(loginUserFailure(error));
  }
}

export const refreshUserBeog = (jwt) => async dispatch => {
  dispatch(userAction());
  
  try {
    const newToken = await refreshUserAPI(jwt);
    dispatch(getUserMetaBeog(newToken));
    dispatch(refreshUser(newToken));
  } catch (error) {
    dispatch(loginUserFailure(error));
  }
}

export const createUserBeog = (user) => async dispatch => {
  dispatch(userAction());

  try {
    const createUserResponse = await createUserAPI(user);
    if (createUserResponse.success === false) {
      dispatch(loginUserFailure(createUserResponse.data.message));     
    } else {
      let newUser = {
        email: user.email,
        password: user.password,
      }
      dispatch(loginUserBeog(newUser));
    }
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
    dispatch(scoreError(error));
  }
}

export const getUserMetaBeog = (token) => async dispatch => {
  dispatch(scoreAction());
  
  try {
    const metaData = await getUserMetaAPI(token);
    const score = metaData.boxgod_score;
    const purchasedPass = metaData.purchased_pass;
    dispatch(setHighScore(score));
    dispatch(setPurchasedPass(purchasedPass));
    return purchasedPass;
  } catch (error) {
    dispatch(scoreError(error));
  }
}

export const uploadHighScoreBeog = (score, token) => async dispatch => {
  dispatch(scoreAction());
  
  try {
    const newScore = await updateHighScoreAPI(score, token);
    dispatch(setHighScore(newScore));
  } catch (error) {
    dispatch(scoreError(error));
  }
}

export const setPoints = points => ({ type: SET_POINTS, payload: { points } });

export const setLives = lives => ({ type: SET_LIVES, payload: { lives } });

export const setHighScore = hiScore => ({ type: SET_HISCORE, payload: { hiScore } });

export const setPurchasedPass = purchasedPass => ({ type: SET_PURCHASED_PASS, payload: { purchasedPass } });