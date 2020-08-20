import React, { useReducer } from "react";
import modalContext from "./modalContext";
import modalReducer from "./modalReducer";
import { SHOW_MODAL, HIDE_MODAL } from "../types";

const ModalsState = (props) => {
  const initialState = {
    type: null,
    isShown: false, // false by default
  };

  const [state, dispatch] = useReducer(modalReducer, initialState);

  // show modal of said type
  const showModal = (modalType) => {
    dispatch({ type: SHOW_MODAL, payload: modalType });
  };

  // hide modal
  const hideModal = () => {
    dispatch({ type: HIDE_MODAL });
  };

  return (
    <modalContext.Provider
      value={{ isShown: state.isShown, type: state.type, showModal, hideModal }}
    >
      {props.children}
    </modalContext.Provider>
  );
};

export default ModalsState;
