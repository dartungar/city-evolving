import React, { useEffect, useContext, useState, useRef } from "react";
import MapContext from "../../context/map/mapContext";

const TerrainLayer = ({ sizeInPx }) => {
  const mapContext = useContext(MapContext);
  const { mapSize, tileSize, tiles } = mapContext;
  const canvasRef = useRef(null);

  // draw tiles after map is initialized
  // TODO: get rid of magic '16' tile size
  // on page load, init canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (mapSize !== null && tiles.length > 0) {
      tiles.forEach((tile) => drawTerrainTile(context, tileSize, tile));
    }
  }, [tiles]);

  const drawTerrainTile = (context, tileSize, tile) => {
    //console.log("drawing tiles for tile", tile);
    context.fillStyle = getElevationColor(tile);
    //console.log(context.fillStyle);
    context.fillRect(
      tile.coordinates.x * tileSize,
      tile.coordinates.y * tileSize,
      tileSize,
      tileSize
    );
    //console.log("filled tile:", tile);
  };

  const getElevationColor = (tile) => {
    const { elevation, isWater, isRiver } = tile;
    if (isRiver === true) {
      return "lightskyblue";
    }

    if (elevation < 0.1 || isWater === true) {
      return "dodgerblue";
    } else if (elevation < 0.15) {
      return "honeydew";
    } else if (elevation < 0.4) {
      return "lightgreen";
    } else if (elevation < 0.6) {
      return "mediumseagreen";
    } else if (elevation < 0.7) {
      return "khaki";
    } else if (elevation < 0.75) {
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
