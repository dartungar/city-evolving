import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import SubTile from "./SubTile";
import MapContext from "../../context/map/mapContext";
import ModalContext from "../../context/modal/modalContext";

const Tile = ({ tile }) => {
  const mapContext = useContext(MapContext);
  const { setTargetTile, isFirstTileChosen } = mapContext;

  const [subtiles, setSubtiles] = useState();

  const modalContext = useContext(ModalContext);
  const { showModal } = modalContext;

  const [isHovered, setIsHovered] = useState(false);

  // useEffect(() => {
  //   if (tile.fillSchema !== null && !subtiles) {
  //     console.log("tile fill schema", tile.fillSchema);
  //     //setSubtiles(generateSubTiles(tile.fillSchema));
  //   }
  // }, [tile.fillSchema]);

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

  const getElevationColor = (elevation) => {
    if (elevation < 0.1) {
      return "blue";
    } else if (elevation < 0.4) {
      return "lightgreen";
    } else if (elevation < 0.6) {
      return "green";
    } else if (elevation < 0.7) {
      return "khaki";
    } else if (elevation < 0.8) {
      return "darkkhaki";
    } else if (elevation < 0.9) {
      return "darkgray";
    } else if (elevation < 0.95) {
      return "dimgray";
    } else return "white";
  };

  const style = {
    //backgroundColor: getTerrainColor(terrain),
    backgroundColor: getElevationColor(tile.elevation),
    //opacity: `${tile.elevation * 100}%`,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
    gridGap: "1px",
  };

  const hoveredStyle = {
    border: isHovered && "2px solid red",
    cursor: "pointer",
  };

  const title = `population: ${Math.ceil(population)}
                development: ${Math.ceil(development)}
                wealth: ${Math.ceil(wealth)}
                food: ${Math.ceil(resources.food)}
                production: ${Math.ceil(resources.production)}
                gold: ${Math.ceil(resources.gold)}
                desire to expand: ${Math.ceil(desireToExpand)}
  `;

  // TODO: больше вариантов, разные стороны
  // const generateSubTiles = (fillSchema) => {
  //   const subtiles = [];
  //   console.log("generating sub tiles with schema", fillSchema);
  //   fillSchema.map((n) => {
  //     subtiles.push(<SubTile tile={tile} number={n} key={`${tile.id}-${n}`} />);
  //   });
  //   return subtiles;
  // };

  const handleClick = () => {
    if (!isFirstTileChosen && tile.terrain !== "river") {
      setTargetTile(tile);
      showModal("confirmSettlement");
      console.log("set target tile:", tile);
    }
  };

  const handleMouseEnter = () => {
    if (!isFirstTileChosen && tile.terrain !== "river") {
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
      style={{ ...style, ...(isHovered && hoveredStyle) }}
      title={title}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* {tile.fillSchema !== null && generateSubTiles(tile.fillSchema)} */}
    </div>
  );
};

Tile.propTypes = {
  tile: PropTypes.object.isRequired,
};

export default Tile;
