import {
  SET_SIZE,
  SET_FIELD,
  CLEAR_FIELD,
  UPDATE_TILE,
  SET_TARGET_TILE,
  CLEAR_TARGET_TILE,
  CHOOSE_FIRST_TILE,
  CLEAR_FIRST_TILE,
} from "../types";

const mapReducer = (state, action) => {
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
    case CLEAR_FIRST_TILE:
      return {
        ...state,
        isFirstTileChosen: false,
      };
    default:
      return state;
  }
};

export default mapReducer;
