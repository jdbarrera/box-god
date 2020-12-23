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
          //email: action.payload.user.email, 
          //password: action.payload.user.password, 
          token: action.payload.data.data.jwt,
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