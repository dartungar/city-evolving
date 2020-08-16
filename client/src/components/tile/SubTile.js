import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SubTile = ({ tile: { development }, number }) => {
  const [tileFillness, setTileFillness] = useState();
  const [tileLevel, setTileLevel] = useState();

  useEffect(() => {
    if (development > 0) {
      setTileFillness(development % 10 > 0 ? development % 10 : 1);

      setTileLevel(Math.ceil((development + 1) / 10));
    }
  }, [development]);

  const getBuildingIconForLevel = (tileLevel) => {
    switch (true) {
      case tileLevel === 1:
        return "⛺";
      case tileLevel === 2:
        return "🏠";
      case tileLevel === 3:
        return "🏡";
      case tileLevel === 4:
        return "🏫";
      case tileLevel === 5:
        return "🏰";
      case tileLevel === 6:
        return "🏤";
      case tileLevel === 7:
        return "🏢";
      case tileLevel >= 8:
        return "🌆";
      default:
        return null;
    }
  };

  const getBuildingIcon = (tileLevel, tileFillness, number) => {
    let buildingIcon;
    if (number <= tileFillness) {
      if (tileLevel === 1) {
        buildingIcon = getBuildingIconForLevel(1);
      } else buildingIcon = getBuildingIconForLevel(tileLevel);
    } else {
      buildingIcon = getBuildingIconForLevel(tileLevel - 1);
    }

    return buildingIcon;
  };

  const style = {
    fontSize: "1rem",
  };

  return (
    <div style={style}>{getBuildingIcon(tileLevel, tileFillness, number)}</div>
  );
};

SubTile.propTypes = {};

export default SubTile;
