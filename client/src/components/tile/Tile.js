import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import SubTile from "./SubTile";
import GameContext from "../../context/game/gameContext";
import ModalContext from "../../context/modal/modalContext";

const Tile = ({ tile }) => {
  const gameContext = useContext(GameContext);
  const { setTargetTile, isFirstTileChosen } = gameContext;

  const [subtiles, setSubtiles] = useState();

  const modalContext = useContext(ModalContext);
  const { showModal } = modalContext;

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (tile.fillSchema !== null && !subtiles) {
      console.log("tile fill schema", tile.fillSchema);
      setSubtiles(generateSubTiles(tile.fillSchema));
    }
  }, [tile.fillSchema]);

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
    border: isHovered && "2px solid red",
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
  const generateSubTiles = (fillSchema) => {
    const subtiles = [];
    console.log("generating sub tiles with schema", fillSchema);
    fillSchema.map((n) => {
      subtiles.push(<SubTile tile={tile} number={n} key={`${tile.id}-${n}`} />);
    });
    return subtiles;
  };

  const handleClick = () => {
    setTargetTile(tile);
    showModal("confirmSettlement");
    console.log("set target tile:", tile);
  };

  const handleMouseEnter = () => {
    if (!isFirstTileChosen) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isFirstTileChosen) {
      setIsHovered(false);
    }
  };

  return (
    <div
      style={style}
      title={title}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {tile.fillSchema !== null && generateSubTiles(tile.fillSchema)}
    </div>
  );
};

Tile.propTypes = {
  tile: PropTypes.object.isRequired,
};

export default Tile;
