import {
  START_GAME,
  UPDATE_TURN_COUNTER,
  RESET_TURN_COUNTER,
  UPDATE_GAME_SCORE,
  RESET_GAME_SCORE,
  SET_STATUS_TEXT,
  CLEAR_STATUS_TEXT,
} from "../types";

const gameReducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        isGameStarted: true,
      };
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
    case SET_STATUS_TEXT:
      return {
        ...state,
        statusText: action.payload,
      };
    case CLEAR_STATUS_TEXT:
      return {
        ...state,
        statusText: "",
      };
    default:
      return state;
  }
};

export default gameReducer;
