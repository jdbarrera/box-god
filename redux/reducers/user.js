import { 
  USER_ACTION,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE
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
    case USER_ACTION:
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
          token: action.payload.jwt[0].token,
          error: null,
          loading: false,
      };
    case LOGIN_USER_FAILURE:
      return {
          ...state, 
          loading: false, 
          error: action.payload,
      };
    case LOGOUT_USER_SUCCESS:
      return {
          ...state, 
          username: "",
          email: "",
          displayname: "",
          token: "",
          error: null,
          loading: false,
      };
    case LOGOUT_USER_FAILURE:
      return {
          ...state, 
          username: "",
          email: "",
          displayname: "",
          token: "",
          error: action.payload,
          loading: false,
      };
    default:
      return state;
  }
};

export default user;