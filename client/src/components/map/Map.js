import React, { useEffect, useContext, useState } from "react";
import MapContext from "../../context/map/mapContext";
import Tile from "../tile/Tile";

const Map = () => {
  const mapContext = useContext(MapContext);
  const { size, setSize, tiles, initMap } = mapContext;
  const [isFirstTilePopulated, setIsFirstTilePopulated] = useState();

  // if
  useEffect(() => {
    // TODO: get rid of magic variable, replace with setting
    if (size === null) {
      setSize(10);
    }

    // if size is set and tiles not yet generated, generate tiles
    if (size !== null && tiles.length === 0) {
      initMap(size);
    }

    // eslint-disable-next-line
  }, [size, tiles]);

  // on page load, create conditions to populate the first tile
  useEffect(() => {
    setIsFirstTilePopulated(false);
  }, []);

  const mapContainerStyle = {
    display: "grid",
    width: "70vh",
    height: "70vh",
    gridTemplateRows: `repeat(${size}, 1fr)`,
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gridGap: "1px",
    padding: "1px",
    border: "1rem solid royalblue",
  };

  return (
    <div style={mapContainerStyle}>
      {tiles && tiles.map((tile) => <Tile tile={tile} key={tile.id} />)}
    </div>
  );
};

export default Map;
