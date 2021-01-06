import { 
  SET_POINTS,
  SET_LIVES, 
  SET_HISCORE,
  SCORE_ACTION,
  SCORE_ERROR,
} from "../actionTypes";

const initialState = {
  points: 0,
  lives: 3,
  hiScore: 0,
  loading: false,
  error: null,
};

const score = (state = initialState, action) => {
  switch (action.type) {
    case SET_POINTS: {
      return {
        ...state,
        points: action.payload.points,
        loading: false,
        error: null,
      };
    }
    case SET_LIVES: {
      return {
        ...state,
        lives: action.payload.lives,
        loading: false,
        error: null,
      };
    }
    case SET_HISCORE: {
      return {
        ...state,
        hiScore: action.payload.hiScore,
        loading: false,
        error: null,
      };
    }
    case SCORE_ACTION: {
      return {
        ...state,
        loading: true,
      };
    }
    case SCORE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    }
    default: {
      return state;
    }
  }
};

export default score;