import axios from "axios";

const userAuth = "https://be-og.com/wp-json/simple-jwt-login/v1/auth";
const validateUser = "https://be-og.com/wp-json/simple-jwt-login/v1/auth/validate";
const revokeUser = 'https://be-og.com/wp-json/simple-jwt-login/v1/auth/revoke';
const refreshUser = 'https://be-og.com/wp-json/simple-jwt-login/v1/auth/refresh';
const userMe = 'https://be-og.com/wp-json/wp/v2/users/me';
const createUser = 'https://be-og.com/wp-json/simple-jwt-login/v1/users';


export const loginUserAPI = async (userDets) => {
  try {
    const response = await axios.post(userAuth, userDets);
    return response;
  } catch (error) {
    return error.response.data;
  }  
};

export const logoutUserAPI = async (token) => {
  try {
    const response = await axios.post(revokeUser, {}, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return response;
  } catch (error) {
    return error.response.data;
  }  
};

export const validateUserAPI = async (token) => {
  try {
    const response = await axios.get(validateUser, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return response;
  } catch (error) {
    return error.response.data;
  }  
};

export const refreshUserAPI = async (token) => {
  try {
    const response = await axios.post(refreshUser, {}, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return response.data.data.jwt;
  } catch (error) {
    return error.response.data;
  }  
};

export const createUserAPI = async (user) => {
  try {
    const response = await axios.post(createUser, user);
    return response;
  } catch (error) {
    return error.response.data;
  }  
};

export const getHighScoreAPI = async (token) => {
  try {
    const response = await axios.get(userMe, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return response.data.meta.boxgod_score;
  } catch (error) {
    return error.response.data;
  }  
};

export const updateHighScoreAPI = async (score, token) => {
  try {
    const response = await axios.post(userMe, 
      {
        meta: {
          boxgod_score: score
        }
      }, 
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    return response.data.meta.boxgod_score;
  } catch (error) {
    return error.response.data;
  }   
};