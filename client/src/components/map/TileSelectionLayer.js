import React, { useEffect, useContext, useState, useRef } from "react";
import MapContext from "../../context/map/mapContext";
import CanvasTile from "../tile/CanvasTile";

const TileSelectionLayer = () => {
  const mapContext = useContext(MapContext);
  const { mapSize, tileSize, setMapSize, tiles, initMap } = mapContext;
  const [isFirstTilePopulated, setIsFirstTilePopulated] = useState();
  const [sizeInPx, setSizeInPx] = useState();
  const canvasRef = useRef(null);

  useEffect(() => {
    setSizeInPx(mapSize * tileSize);
  }, []);

  // get mouse coordinates inside canvas
  const getMouseCoordinatesInsideCanvas = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const coordinates = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    //console.log(coordinates);
    return coordinates;
  };

  // get coordinates of a tile inside which is mouse
  const getTileCoordinatesFromMousePosition = (tileSize, coordinates) => {
    let x = Math.floor(coordinates.x / tileSize);
    let y = Math.floor(coordinates.y / tileSize);
    x = x > 0 ? x : 0;
    y = y > 0 ? y : 0;

    return { x, y };
  };

  // get tile based on coordinates
  const getTileByCoordinates = (coordinates) => {
    const foundTile = tiles.filter(
      (tile) =>
        tile.coordinates.x === coordinates.x &&
        tile.coordinates.y === coordinates.y
    )[0];
    return foundTile;
  };

  const getTileByMousePosition = (event) => {
    const mousePosition = getMouseCoordinatesInsideCanvas(event);
    const tileCoordinates = getTileCoordinatesFromMousePosition(
      tileSize,
      mousePosition
    );
    const tile = getTileByCoordinates(tileCoordinates);
    if (tile) {
      return tile;
    } else console.log("no tile found for coordinates: ", tileCoordinates);

    //console.log(tile.id);
  };

  // draw 'border' for tile: a bigger tile on which we will draw original tile again
  const drawTileBorder = (context, tileSize, tile) => {
    // draw a bigger tile which will act as a border
    context.fillStyle = "red";
    context.fillRect(
      tile.coordinates.x * tileSize - 1,
      tile.coordinates.y * tileSize - 1,
      tileSize + 2,
      tileSize + 2
    );
  };

  const drawTileBorderOnMouseMove = (event) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, sizeInPx, sizeInPx);

    const tile = getTileByMousePosition(event);
    console.log(tile.id);
    drawTileBorder(context, tileSize, tile);
  };

  const tileBorderLayerStyle = {
    position: "relative",
    zIndex: "200",
  };

  return (
    <canvas
      ref={canvasRef}
      width={`${sizeInPx}px`}
      height={`${sizeInPx}px`}
      onMouseMove={drawTileBorderOnMouseMove}
      style={tileBorderLayerStyle}
    />
  );
};

export default TileSelectionLayer;
