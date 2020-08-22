import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const BuildingIcon = ({ developmentLevel }) => {
  const [tileFillness, setTileFillness] = useState();
  const [tileLevel, setTileLevel] = useState();

  const getBuildingIconForLevel = (developmentLevel) => {
    switch (true) {
      case developmentLevel === 1:
        return "⛺";
      case developmentLevel === 2:
        return "🏠";
      case developmentLevel === 3:
        return "🏡";
      case developmentLevel === 4:
        return "🏫";
      case developmentLevel === 5:
        return "🏰";
      case developmentLevel === 6:
        return "🏤";
      case developmentLevel === 7:
        return "🏢";
      case developmentLevel >= 8:
        return "🌆";
      default:
        return null;
    }
  };

  const style = {
    fontSize: "1rem",
  };

  return <div style={style}>{getBuildingIconForLevel(developmentLevel)}</div>;
};

BuildingIcon.propTypes = {};

export default BuildingIcon;
