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
  CLEAR_FIRST_TILE,
} from "../types";
import generateMap from "../../helpers/generateMap";

const MapState = (props) => {
  const initialState = {
    mapSize: 20,
    tileSize: 16,
    tiles: [],
    isFirstTileChosen: false,
    targetTile: null,
  };

  const [state, dispatch] = useReducer(mapReducer, initialState);

  // set size
  const setMapSize = (size) => {
    dispatch({ type: SET_SIZE, payload: size });
  };

  // update the whole field (tiles)
  const setMap = (tiles) => {
    dispatch({ type: SET_FIELD, payload: tiles });
  };

  // initialize field: create tiles based on field size
  const initMap = (size) => {
    const tiles = generateMap(size, Math.random());
    setMap(tiles);
    dispatch({ type: CLEAR_FIRST_TILE });
  };

  // recalculate the whole field (tiles)
  const recalculateMap = (tiles) => {
    tiles.forEach((tile) => {
      tile.calculateChangesOnTurn();
      tile.decideIfUpgrade();
      if (tile.decideIfSettle()) {
        const chosenTile = tile.chooseTileToPopulate(tiles, tile);
        if (chosenTile) {
          console.log("we should populate some new tile!", chosenTile);
          populateTile(chosenTile);
        } else console.log("no tiles to populate!");
      }
    });
  };

  // clear field
  const clearMap = () => {
    dispatch({ type: CLEAR_FIELD });
  };

  // calculate tile changes during this turn
  // const calculateTile = (field, tile) => {
  //   if (tile.population > 0) {
  //     tile = calculateTileResources(field, tile);
  //     // TODO: remove magic numbers
  //     if (tile.desireToExpand > 50) {
  //       const tileToPopulate = chooseAdjacentTileToPopulate(field, tile);
  //       console.log("choosen tile to populate:", tileToPopulate);
  //       if (tileToPopulate) {
  //         populateTile(tile, tileToPopulate);
  //         tile.population = tile.population - 5;
  //         tile.desireToExpand = 0;
  //         updateTile(tile);
  //       } else console.log("no valid tiles to populate!");
  //     }
  //   }
  //   return tile;
  // };

  // populate first tile
  const populateFirstTile = (tile) => {
    populateTile(tile, tile);
    dispatch({ type: CHOOSE_FIRST_TILE });
  };

  // populate chosen tile
  const populateTile = (tile) => {
    tile.population = 1;
  };

  // update specific tile
  // const updateTile = (newTile) => {
  //   dispatch({ type: UPDATE_TILE, payload: newTile });
  // };

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
        mapSize: state.mapSize,
        tileSize: state.tileSize,
        tiles: state.tiles,
        targetTile: state.targetTile,
        isFirstTileChosen: state.isFirstTileChosen,
        setMapSize,
        initMap,
        populateTile,
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
