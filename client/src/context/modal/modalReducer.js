import { SHOW_MODAL, HIDE_MODAL } from "../types";

const modalReducer = (state, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, isShown: true, type: action.payload };
    case HIDE_MODAL:
      return { ...state, isShown: false, type: null };
    default:
      return state;
  }
};

export default modalReducer;
