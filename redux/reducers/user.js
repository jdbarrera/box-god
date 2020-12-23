import { 
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE, 
} from "../actionTypes";

const initialState = {
  username: "",
  email: "",
  displayname: "",
  token: "",
  error: null,
  loading: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
          ...state, 
          loading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
          ...state,
          username: action.payload.user.user_login,
          email: action.payload.user.user_email,
          displayname: action.payload.user.display_name,
          token: action.payload.jwt.token,
          loading: false,
      };
    case LOGIN_USER_FAILURE:
      return {
          ...state, 
          loading: false, 
          error: action.payload.error,
      };
    default:
      return state;
  }
};

export default user;