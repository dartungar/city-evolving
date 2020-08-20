import React, { useContext } from "react";
import PropTypes from "prop-types";
import ModalContext from "../../context/modal/modalContext";
import ConfirmSettlementModal from "./ConfirmSettlementModal";

const Modal = (props) => {
  const modalContext = useContext(ModalContext);
  const { isShown, type } = modalContext;

  const style = {
    zIndex: "200",
    position: "absolute",
    backgroundColor: "white",
    width: "40vw",
    minHeight: "10vh",
    top: "30vh",
    left: "30vw",
    opacity: "90%",
    border: "1px black solid",
    textAlign: "center",
  };

  const buttonStyle = {
    height: "1rem",
    width: "4rem",
    backgroundColor: "grey",
    border: "1px black solid",
  };

  const getModalByType = () => {
    if (type === "confirmSettlement") {
      return <ConfirmSettlementModal />;
    }
  };

  if (isShown) {
    return <div style={style}>{getModalByType()}</div>;
  }
};

Modal.propTypes = {};

export default Modal;
