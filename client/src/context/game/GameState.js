import React, { useReducer } from "react";
import gameContext from "./gameContext";
import gameReducer from "./gameReducer";
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
import generateTile from "../../helpers/generateTile";
import calculateTileResources from "../../helpers/calculateTile";
import chooseAdjacentTileToPopulate from "../../helpers/populateTile";
import calculateGameScore from "../../helpers/calculateGameScore";
import chooseFillSchema from "../../helpers/tileFillDirectionTemplates";

const GameState = (props) => {
  const initialState = {
    size: null,
    tiles: [],
    isFirstTileChosen: false,
    targetTile: null,
    turns: 0,
    score: { population: 0, development: 0 },
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);

  // increment turn counter
  const incrementTurnCounter = () => {
    const newTurnCounterValue = state.turns === null ? 1 : state.turns + 1;
    dispatch({ type: UPDATE_TURN_COUNTER, payload: newTurnCounterValue });
  };

  // reset turn counter
  const resetTurnCounter = () => {
    dispatch({ type: RESET_TURN_COUNTER });
  };

  // on turn change, recalculate field resources & game score
  const onChangeTurn = (field) => {
    recalculateField(field);
    updateGameScore(field);
  };

  // calculate & update game score
  const updateGameScore = (field) => {
    const newGameScore = calculateGameScore(field);
    dispatch({ type: UPDATE_GAME_SCORE, payload: newGameScore });
  };

  // reset game score
  const resetGameScore = () => {
    dispatch({ type: RESET_GAME_SCORE });
  };

  // set size
  const setSize = (size) => {
    dispatch({ type: SET_SIZE, payload: size });
  };

  // update the whole field (tiles)
  const setField = (tiles) => {
    dispatch({ type: SET_FIELD, payload: tiles });
  };

  // initialize field: create tiles based on field size
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
    <gameContext.Provider
      value={{
        size: state.size,
        tiles: state.tiles,
        turns: state.turns,
        score: state.score,
        targetTile: state.targetTile,
        isFirstTileChosen: state.isFirstTileChosen,
        setSize,
        initField,
        populateFirstTile,
        incrementTurnCounter,
        resetTurnCounter,
        onChangeTurn,
        setTargetTile,
        clearTargetTile,
      }}
    >
      {props.children}
    </gameContext.Provider>
  );
};

export default GameState;
