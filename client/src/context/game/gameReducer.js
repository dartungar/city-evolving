import {
  SET_SIZE,
  SET_FIELD,
  CLEAR_FIELD,
  UPDATE_TILE,
  UPDATE_TURN_COUNTER,
  RESET_TURN_COUNTER,
  UPDATE_GAME_SCORE,
  RESET_GAME_SCORE,
  SET_TARGET_TILE,
  CLEAR_TARGET_TILE,
  CHOOSE_FIRST_TILE,
} from "../types";

const gameReducer = (state, action) => {
  switch (action.type) {
    case SET_SIZE:
      return { ...state, size: action.payload };

    case SET_FIELD:
      return {
        ...state,
        tiles: action.payload,
      };
    case CLEAR_FIELD:
      return {
        ...state,
        tiles: [],
      };
    case UPDATE_TILE:
      return {
        ...state,
        // TODO: если тайла нет, добавить. если тайл есть - заменить
        tiles: state.tiles.map((tile) =>
          tile.id === action.payload.id ? action.payload : tile
        ),
      };
    case SET_TARGET_TILE:
      return { ...state, targetTile: action.payload };
    case CLEAR_TARGET_TILE:
      return {
        ...state,
        targetTile: null,
      };
    case CHOOSE_FIRST_TILE:
      return {
        ...state,
        isFirstTileChosen: true,
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
    default:
      return state;
  }
};

export default gameReducer;
