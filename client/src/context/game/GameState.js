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

  // calculate & update game score
  const updateGameScore = (field) => {
    const newGameScore = calculateGameScore(field);
    dispatch({ type: UPDATE_GAME_SCORE, payload: newGameScore });
  };

  // reset game score
  const resetGameScore = () => {
    dispatch({ type: RESET_GAME_SCORE });
  };

  return (
    <gameContext.Provider
      value={{
        turns: state.turns,
        score: state.score,
        incrementTurnCounter,
        resetTurnCounter,
        updateGameScore,
      }}
    >
      {props.children}
    </gameContext.Provider>
  );
};

export default GameState;
