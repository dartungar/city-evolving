import React, { useEffect, useContext, useState, useRef } from "react";
import MapContext from "../../context/map/mapContext";

const TerrainLayer = ({ sizeInPx }) => {
  const mapContext = useContext(MapContext);
  const { mapSize, tileSize, setMapSize, tiles, initMap } = mapContext;
  const [isFirstTilePopulated, setIsFirstTilePopulated] = useState();
  const canvasRef = useRef(null);

  // draw tiles after map is initialized
  // TODO: get rid of magic '16' tile size
  // on page load, init canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (mapSize !== null && tiles.length > 0) {
      tiles.forEach((tile) => drawTile(context, 16, tile));
    }
  }, [tiles]);

  const drawTile = (context, tileSize, tile) => {
    //console.log("drawing tiles for tile", tile);
    context.fillStyle = getElevationColor(tile.elevation);
    //console.log(context.fillStyle);
    context.fillRect(
      tile.coordinates.x * tileSize,
      tile.coordinates.y * tileSize,
      tileSize,
      tileSize
    );
    //console.log("filled tile:", tile);
  };

  const getElevationColor = (elevation) => {
    if (elevation < 0.1) {
      return "dodgerblue";
    } else if (elevation < 0.15) {
      return "aquamarine";
    } else if (elevation < 0.4) {
      return "lightgreen";
    } else if (elevation < 0.5) {
      return "mediumseagreen";
    } else if (elevation < 0.6) {
      return "khaki";
    } else if (elevation < 0.7) {
      return "darkkhaki";
    } else if (elevation < 0.8) {
      return "peru";
    } else if (elevation < 0.85) {
      return "darkgray";
    } else if (elevation < 0.9) {
      return "lightslategray";
    } else if (elevation < 0.95) {
      return "dimgray";
    } else return "white";
  };

  const terrainLayerStyle = {
    position: "absolute",
    zIndex: "100",
  };

  return (
    <canvas
      ref={canvasRef}
      width={`${sizeInPx}px`}
      height={`${sizeInPx}px`}
      style={terrainLayerStyle}
    />
  );
};

export default TerrainLayer;
