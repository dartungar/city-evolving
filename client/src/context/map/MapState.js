import React, { useReducer } from "react";
import mapContext from "./mapContext";
import mapReducer from "./mapReducer";
import {
  SET_SIZE,
  SET_FIELD,
  CLEAR_FIELD,
  UPDATE_TILE,
  SET_TARGET_TILE,
  CLEAR_TARGET_TILE,
  CHOOSE_FIRST_TILE,
} from "../types";
import generateTile from "../../helpers/generateTile";
import calculateTileResources from "../../helpers/calculateTile";
import chooseAdjacentTileToPopulate from "../../helpers/populateTile";
import chooseFillSchema from "../../helpers/tileFillDirectionTemplates";

const MapState = (props) => {
  const initialState = {
    size: null,
    tiles: [],
    isFirstTileChosen: false,
    targetTile: null,
  };

  const [state, dispatch] = useReducer(mapReducer, initialState);

  // set size
  const setSize = (size) => {
    dispatch({ type: SET_SIZE, payload: size });
  };

  // update the whole field (tiles)
  const setMap = (tiles) => {
    dispatch({ type: SET_FIELD, payload: tiles });
  };

  // initialize field: create tiles based on field size
  const initMap = (size) => {
    const tiles = [];
    let id = 0;
    for (let y = 1; y <= size; y++) {
      for (let x = 1; x <= size; x++) {
        // TODO: функция initTile(x, y) с более сложной логикой генерации тайла
        id++;
        const tile = generateTile(id, x, y);
        tiles.push(tile);
      }
    }
    setMap(tiles);
  };

  // recalculate the whole field (tiles)
  const recalculateMap = (tiles) => {
    const newMap = tiles.map((tile) => calculateTile(tiles, tile));
    setMap(newMap);
  };

  // clear field
  const clearMap = () => {
    dispatch({ type: CLEAR_FIELD });
  };

  // calculate tile changes during this turn
  const calculateTile = (field, tile) => {
    if (tile.population > 0) {
      tile = calculateTileResources(field, tile);
      // TODO: remove magic numbers
      if (tile.desireToExpand > 50) {
        const tileToPopulate = chooseAdjacentTileToPopulate(field, tile);
        console.log("choosen tile to populate:", tileToPopulate);
        if (tileToPopulate) {
          populateTile(tile, tileToPopulate);
          tile.population = tile.population - 5;
          tile.desireToExpand = 0;
          updateTile(tile);
        } else console.log("no valid tiles to populate!");
      }
    }
    return tile;
  };

  // populate first tile
  const populateFirstTile = (tile) => {
    populateTile(tile, tile);
    dispatch({ type: CHOOSE_FIRST_TILE });
  };

  // populate chosen tile
  const populateTile = (originTile, tileToPopulate) => {
    tileToPopulate.population = 1;
    tileToPopulate.fillSchema = chooseFillSchema(originTile, tileToPopulate);
    updateTile(tileToPopulate);
  };

  // update specific tile
  const updateTile = (newTile) => {
    dispatch({ type: UPDATE_TILE, payload: newTile });
  };

  // set target tile
  const setTargetTile = (tile) => {
    dispatch({ type: SET_TARGET_TILE, payload: tile });
  };

  // clear target tile
  const clearTargetTile = () => {
    dispatch({ type: CLEAR_TARGET_TILE });
  };

  return (
    <mapContext.Provider
      value={{
        size: state.size,
        tiles: state.tiles,
        targetTile: state.targetTile,
        isFirstTileChosen: state.isFirstTileChosen,
        setSize,
        initMap,
        populateFirstTile,
        setTargetTile,
        clearTargetTile,
        recalculateMap,
      }}
    >
      {props.children}
    </mapContext.Provider>
  );
};

export default MapState;
