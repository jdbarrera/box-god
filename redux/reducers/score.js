import { 
  SET_POINTS,
  SET_LIVES, 
  } from "../actionTypes";

const initialState = {
  points: 0,
  lives: 3,
};

const score = (state = initialState, action) => {
  switch (action.type) {
    case SET_POINTS: {
      return {
        ...state,
        points: action.payload.points,
      };
    }
    case SET_LIVES: {
      return {
        ...state,
        lives: action.payload.lives,
      };
    }
    default: {
      return state;
    }
  }
};

export default score;