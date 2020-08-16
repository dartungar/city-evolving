import React from "react";
import PropTypes from "prop-types";
import SubTile from "./SubTile";

const Tile = ({ tile }) => {
  const {
    terrain,
    development,
    population,
    wealth,
    resources,
    desireToExpand,
  } = tile;

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

  const style = {
    backgroundColor: getTerrainColor(terrain),
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
    gridGap: "1px",
  };

  const title = `population: ${population}
                development: ${development}
                wealth: ${wealth}
                food: ${resources.food}
                production: ${resources.production}
                gold: ${resources.gold}
                desire to expand: ${desireToExpand}
  `;

  // TODO: больше вариантов, разные стороны
  const generateSubTiles = () => {
    const subtiles = [];
    for (let i = 1; i <= 9; i++) {
      subtiles.push(<SubTile tile={tile} number={i} key={`${tile.id}-${i}`} />);
    }
    return subtiles;
  };

  return (
    <div style={style} title={title}>
      {generateSubTiles()}
    </div>
  );
};

Tile.propTypes = {
  tile: PropTypes.object.isRequired,
};

export default Tile;
