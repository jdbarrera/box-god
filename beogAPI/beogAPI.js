import axios from "axios";

const userAuth = "https://be-og.com/wp-json/simple-jwt-login/v1/auth";
const validateUser = "https://be-og.com/wp-json/simple-jwt-login/v1/auth/validate";
const revokeUser = 'https://be-og.com/wp-json/simple-jwt-login/v1/auth/revoke';

export const loginUserAPI = async (userDets) => {

  try {
    const response = await axios.post(userAuth, userDets);
    return response;
  } catch (error) {
    return error;
  }
  
};

/*export const logoutUserAPI = async (userDets) => {

  try {
    const response = await axios.post(userAuth, userDets);
    return response;
  } catch (error) {
    return error;
  }
  
};*/

export const validateUserAPI = async (token) => {
  console.log(token);

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