import {
  UPDATE_TURN_COUNTER,
  RESET_TURN_COUNTER,
  UPDATE_GAME_SCORE,
  RESET_GAME_SCORE,
} from "../types";

const gameReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_TURN_COUNTER:
      return {
        ...state,
        turns: action.payload,
      };
    case RESET_TURN_COUNTER:
      return {
        ...state,
        turns: 0,
      };
    case UPDATE_GAME_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    case RESET_GAME_SCORE:
      return {
        ...state,
        score: { population: 0, development: 0 },
      };
    default:
      return state;
  }
};

export default gameReducer;
