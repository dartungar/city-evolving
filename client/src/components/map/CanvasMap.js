import React, { useEffect, useContext, useState, useRef } from "react";
import MapContext from "../../context/map/mapContext";
import TerrainLayer from "./TerrainLayer";
import TileSelectionLayer from "./TileSelectionLayer";

const CanvasMap = () => {
  const mapContext = useContext(MapContext);
  const { mapSize, tileSize, setMapSize, tiles, initMap } = mapContext;
  const [isFirstTilePopulated, setIsFirstTilePopulated] = useState();
  const canvasRef = useRef(null);

  useEffect(() => {
    // TODO: get rid of magic variable, replace with setting chosen on game start
    if (mapSize === null) {
      setMapSize(50);
    }

    // if size is set and tiles not yet generated, generate tiles
    if (mapSize !== null && tiles.length === 0) {
      initMap(mapSize);
    }

    // eslint-disable-next-line
  }, [mapSize, tiles]);

  // on page load, create conditions to populate the first tile
  useEffect(() => {
    setIsFirstTilePopulated(false);
  }, []);

  const mapContainerStyle = {
    position: "relative",
    zIndex: "0",
    padding: "1px",
    border: "1rem solid royalblue",
  };

  return (
    <div
      style={mapContainerStyle}
      width={`${mapSize * tileSize}px`}
      height={`${mapSize * tileSize}px`}
    >
      <TerrainLayer />
      <TileSelectionLayer />
    </div>
  );
};

export default CanvasMap;
