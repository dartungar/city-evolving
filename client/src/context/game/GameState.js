import React, { useReducer } from "react";
import gameContext from "./gameContext";
import gameReducer from "./gameReducer";
import {
  SET_IS_GAME_ACTIVE,
  UPDATE_TURN_COUNTER,
  RESET_TURN_COUNTER,
  UPDATE_GAME_SCORE,
  RESET_GAME_SCORE,
  SET_STATUS_TEXT,
  CLEAR_STATUS_TEXT,
} from "../types";
import calculateGameScore from "../../helpers/calculateGameScore";

const GameState = (props) => {
  const initialState = {
    isGameActive: false,
    turns: 0,
    maxTurns: 10, // TODO: make into setting
    score: { population: 0, development: 0, wealth: 0 },
    statusText: "  ",
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);

  // start game
  const startGame = () => {
    dispatch({ type: SET_IS_GAME_ACTIVE, payload: true });
  };

  const endGame = () => {
    dispatch({ type: SET_IS_GAME_ACTIVE, payload: false });
  };

  const restartGame = () => {
    dispatch({ type: SET_IS_GAME_ACTIVE, payload: true });
    dispatch({ type: RESET_TURN_COUNTER });
    dispatch({ type: RESET_GAME_SCORE });
    dispatch({ type: CLEAR_STATUS_TEXT });
  };

  // on every turn - TODO?
  const nextTurn = () => {};

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

  // set status text
  const setStatusText = (text) => {
    dispatch({ type: SET_STATUS_TEXT, payload: text });
  };

  // clear status text
  const clearStatusText = (text) => {
    dispatch({ type: CLEAR_STATUS_TEXT });
  };

  return (
    <gameContext.Provider
      value={{
        turns: state.turns,
        maxTurns: state.maxTurns,
        score: state.score,
        isGameActive: state.isGameActive,
        statusText: state.statusText,
        startGame,
        endGame,
        restartGame,
        incrementTurnCounter,
        updateGameScore,
        setStatusText,
        clearStatusText,
      }}
    >
      {props.children}
    </gameContext.Provider>
  );
};

export default GameState;
