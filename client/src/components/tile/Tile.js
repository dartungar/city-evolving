import React from "react";
import PropTypes from "prop-types";

const Tile = ({ tile: { terrain, development, populace, resources } }) => {
  const getTerrainColor = (terrain) => {
    const terrainColors = {
      plains: "lightgreen",
      woods: "green",
      hills: "gold",
      mountains: "darkgrey",
      river: "royalblue",
    };

    return terrainColors[terrain];
  };

  const getBuildingIcon = (development) => {
    switch (true) {
      case development >= 1 && development < 20:
        return "⛺";
      case development >= 20 && development < 40:
        return "🏠";
      case development >= 40 && development < 60:
        return "🏡";
      case development >= 60 && development < 80:
        return "🏫";
      case development >= 80 && development < 100:
        return "🏰";
      case development >= 100 && development < 120:
        return "🏤";
      case development >= 120 && development < 140:
        return "🏢";
      case development >= 140:
        return "🌆";
      default:
        return null;
    }
  };

  const style = {
    backgroundColor: getTerrainColor(terrain),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
  };

  const title = `population: ${populace}
  development: ${development}
  food: ${resources.food}
  production: ${resources.production}
  gold: ${resources.gold}
  `;

  return (
    <div style={style} title={title}>
      {getBuildingIcon(development)}
    </div>
  );
};

Tile.propTypes = {
  tile: PropTypes.object.isRequired,
};

export default Tile;
