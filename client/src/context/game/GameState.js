import React, { useReducer } from "react";
import gameContext from "./gameContext";
import gameReducer from "./gameReducer";
import { SET_SIZE, SET_FIELD, CLEAR_FIELD, UPDATE_TILE } from "../types";
import generateTile from "../../helpers/generateTile";
import calculateTileResources from "../../helpers/calculateTile";
import chooseAdjacentTileToPopulate from "../../helpers/populateTile";

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

  // update the whole field (tiles)
  const setField = (tiles) => {
    dispatch({ type: SET_FIELD, payload: tiles });
  };

  // create tiles based on field size
  const initField = (size) => {
    const field = [];
    let id = 0;
    for (let y = 1; y <= size; y++) {
      for (let x = 1; x <= size; x++) {
        // TODO: функция initTile(x, y) с более сложной логикой генерации тайла
        id++;
        const tile = generateTile(id, x, y);
        field.push(tile);
      }
    }
    setField(field);
  };

  // recalculate the whole field (tiles)
  const recalculateField = (field) => {
    const newField = field.map((tile) => calculateTile(field, tile));
    setField(newField);
  };

  // clear field
  const clearField = () => {
    dispatch({ type: CLEAR_FIELD });
  };

  // calculate tile changes during this turn
  const calculateTile = (field, tile) => {
    // TODO: calculate if adjacent tile is to be populated
    if (tile.populace > 0) {
      tile = calculateTileResources(field, tile);
      // TODO: remove magic numbers
      if (tile.populace > 10) {
        const tileToPopulate = chooseAdjacentTileToPopulate(field, tile);
        console.log("choosen tile to populate:", tileToPopulate);
        if (tileToPopulate) {
          populateTile(tileToPopulate);
          tile.populace = tile.populace - 10;
          updateTile(tile);
        } else console.log("no valid tiles to populate!");
      }
    }
    return tile;
  };

  // populate first tile
  const populateFirstTile = (field) => {
    console.log(field);
    const habitableTiles = field.filter((tile) => tile.isWater === false);
    const chosenTile =
      habitableTiles[Math.floor(Math.random() * habitableTiles.length)];
    populateTile(chosenTile);
  };

  // populate tile
  const populateTile = (tile) => {
    tile.populace = 1;
    updateTile(tile);
  };

  // update specific tile
  const updateTile = (newTile) => {
    dispatch({ type: UPDATE_TILE, payload: newTile });
  };

  return (
    <gameContext.Provider
      value={{
        size: state.size,
        tiles: state.tiles,
        setSize,
        initField,
        populateFirstTile,
        recalculateField,
      }}
    >
      {props.children}
    </gameContext.Provider>
  );
};

export default GameState;
