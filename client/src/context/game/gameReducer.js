import { SET_POPULACE, SET_SIZE, SET_TILE, SET_FIELD } from "../types";

const gameReducer = (state, action) => {
  switch (action.type) {
    case SET_SIZE:
      return { ...state, size: action.payload };

    case SET_FIELD:
      return {
        ...state,
        tiles: action.payload,
      };
    case SET_TILE:
      return {
        ...state,
        // TODO: если тайла нет, добавить. если тайл есть - заменить
        tiles: [...state.tiles, action.payload],
      };
    default:
      return state;
  }
};

export default gameReducer;
