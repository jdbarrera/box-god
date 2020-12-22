import axios from "axios";

const userAuth = "https://be-og.com/wp-json/simple-jwt-login/v1/auth";

const loginUserAPI = async (userDets) => {
  try {
    const response = await axios.post(userAuth, userDets);
    return response;
  } catch (error) {
    return error;
  }
};

export default loginUserAPI;
