import React, { useReducer } from "react";
import gameContext from "./gameContext";
import gameReducer from "./gameReducer";
import { SET_SIZE, SET_FIELD, SET_TILE } from "../types";

const GameState = (props) => {
  const initialState = {
    size: null,
    tiles: [],
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);

  // set size
  const setSize = (size) => {
    dispatch({ type: SET_SIZE, payload: size });
  };

  // create tiles based on field size
  const initTiles = (size) => {
    const field = [];
    let id = 0;
    for (let y = 1; y <= size; y++) {
      for (let x = 1; x <= size; x++) {
        // TODO: функция initTile(x, y) с более сложной логикой генерации тайла
        id++;
        const tile = {
          id: id,
          coordinates: [x, y],
        };
        setTile(tile);
      }
    }
  };

  // set the whole field
  const setField = (tiles) => {
    dispatch({ type: SET_FIELD, payload: tiles });
  };

  // sort tiles - ?

  // clear tiles

  // change tile stats
  const setTile = (tile) => {
    dispatch({ type: SET_TILE, payload: tile });
  };

  //

  return (
    <gameContext.Provider
      value={{
        size: state.size,
        tiles: state.tiles,
        setSize,
        initTiles,
        setTile,
      }}
    >
      {props.children}
    </gameContext.Provider>
  );
};

export default GameState;
