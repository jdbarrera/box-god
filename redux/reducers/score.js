import { SET_SCORE } from "../actionTypes";

const initialState = 0;

const score = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCORE: {
      return action.payload.score;
    }
    default: {
      return state;
    }
  }
};

export default score;