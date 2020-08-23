import React, { useEffect, useContext, useState, useRef } from "react";
import MapContext from "../../context/map/mapContext";
import TerrainLayer from "./TerrainLayer";
import TileSelectionLayer from "./TileSelectionLayer";

const CanvasMap = () => {
  const mapContext = useContext(MapContext);
  const { mapSize, tileSize, setMapSize, tiles, initMap } = mapContext;

  const [isFirstTilePopulated, setIsFirstTilePopulated] = useState();
  const [sizeInPx, setSizeInPx] = useState();
  const canvasRef = useRef(null);

  useEffect(() => {
    setSizeInPx(mapSize * tileSize);
  }, []);

  useEffect(() => {
    // if size is set and tiles not yet generated, generate tiles
    if (mapSize !== null && tiles.length === 0) {
      initMap(mapSize);
    }

    // eslint-disable-next-line
  }, [mapSize, tiles]);

  const mapContainerStyle = {
    //position: "absolute",
    zIndex: "0",
    //padding: "1px",
    border: "1rem solid royalblue",
  };

  return (
    <div
      style={mapContainerStyle}
      width={`${sizeInPx}px`}
      height={`${sizeInPx}px`}
    >
      <TerrainLayer sizeInPx={sizeInPx} />
      <TileSelectionLayer sizeInPx={sizeInPx} />
    </div>
  );
};

export default CanvasMap;
