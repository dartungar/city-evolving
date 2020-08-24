import React, { useEffect, useContext, useState, useRef } from "react";
import MapContext from "../../context/map/mapContext";
import GameContext from "../../context/game/gameContext";
import ModalContext from "../../context/modal/modalContext";

const TileSelectionLayer = ({ sizeInPx }) => {
  const mapContext = useContext(MapContext);
  const { mapSize, tileSize, tiles, setTargetTile } = mapContext;

  const gameContext = useContext(GameContext);
  const { isGameActive } = gameContext;

  const modalContext = useContext(ModalContext);
  const { showModal } = modalContext;

  const [isFirstTilePopulated, setIsFirstTilePopulated] = useState();
  const canvasRef = useRef(null);

  // on page load, create conditions to populate the first tile
  useEffect(() => {
    setIsFirstTilePopulated(false);
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

  const getTileByMouseEvent = (event) => {
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

  // draw border for a tile
  const drawTileBorder = (context, tileSize, tile) => {
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "red";
    context.rect(
      tile.coordinates.x * tileSize - 1,
      tile.coordinates.y * tileSize - 1,
      tileSize + 2,
      tileSize + 2
    );
    context.stroke();
  };

  const drawTileBorderOnMouseMove = (event) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, sizeInPx, sizeInPx);

    const tile = getTileByMouseEvent(event);
    drawTileBorder(context, tileSize, tile);
  };

  const handleOnMouseMove = (event) => {
    if (!isFirstTilePopulated && isGameActive) {
      drawTileBorderOnMouseMove(event);
    }
  };

  const handleClick = (event) => {
    if (!isFirstTilePopulated) {
      const tile = getTileByMouseEvent(event);
      setTargetTile(tile);
      showModal("confirmSettlement");
      console.log("set target tile:", tile);
    }
  };

  const tileBorderLayerStyle = {
    position: "absolute",
    zIndex: "200",
  };

  return (
    <canvas
      ref={canvasRef}
      width={`${sizeInPx}px`}
      height={`${sizeInPx}px`}
      onMouseMove={handleOnMouseMove}
      onClick={handleClick}
      style={tileBorderLayerStyle}
    />
  );
};

export default TileSelectionLayer;
