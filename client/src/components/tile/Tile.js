import React from "react";
import PropTypes from "prop-types";

const Tile = ({ tile: { coordinates, id } }) => {
  const style = {
    backgroundColor: "lightblue",
  };

  return <div style={style}>{id}</div>;
};

Tile.propTypes = {
  tile: PropTypes.object.isRequired,
};

export default Tile;
