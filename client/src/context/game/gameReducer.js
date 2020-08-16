import { SET_SIZE, SET_FIELD, CLEAR_FIELD, UPDATE_TILE } from "../types";

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
    default:
      return state;
  }
};

export default gameReducer;
