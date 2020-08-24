import React, { useEffect, useContext, useState, useRef } from "react";
import MapContext from "../../context/map/mapContext";
import GameContext from "../../context/game/gameContext";
import ModalContext from "../../context/modal/modalContext";

const BuildingsLayer = ({ sizeInPx }) => {
  const mapContext = useContext(MapContext);
  const { mapSize, tileSize, tiles, setTargetTile } = mapContext;

  const gameContext = useContext(GameContext);
  const { isGameActive } = gameContext;

  const modalContext = useContext(ModalContext);
  const { showModal } = modalContext;

  const [image, setImage] = useState();
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image(112, 832);
    img.src = "./tileset.png";
    setImage(img);
    console.log(img);
  }, []);

  // draw tiles after map is initialized
  // TODO: get rid of magic '16' tile size
  // on page load, init canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (mapSize !== null && tiles.length > 0) {
      tiles.forEach((tile) => drawBuildingTile(context, 16, tile));
    }
  }, [tiles]);

  const drawBuildingTile = (context, tileSize, tile) => {
    //console.log("drawing tiles for tile", tile);
    //context.fillStyle = getElevationColor(tile);
    //console.log(context.fillStyle);
    const tileSrcCoords = getTileSrcCoords(tile);
    context.drawImage(
      image, // img
      tileSrcCoords[0], // target tile coordinates on source image - x
      tileSrcCoords[1], // target tile coordinates on source image - y
      tileSize, // size of image to 'crop' from source image - x
      tileSize, // size of image to 'crop' from source image - y
      tile.coordinates.x * tileSize, // coordinates on canvas to draw image on - x
      tile.coordinates.y * tileSize, // coordinates on canvas to draw image on - y
      tileSize, // size of image to draw - x
      tileSize // size of image to draw - y
    );
    //console.log("filled tile:", tile);
  };

  const getTileSrcCoords = (tile) => {
    if (tile.elevation >= 0.4 && tile.elevation < 0.6) {
      return [0, 16];
    } else return [0, 817];
  };

  const tileBorderLayerStyle = {
    position: "absolute",
    right: `${sizeInPx}`,
    zIndex: "300",
  };

  return (
    <canvas
      ref={canvasRef}
      width={`${sizeInPx}px`}
      height={`${sizeInPx}px`}
      style={tileBorderLayerStyle}
    />
  );
};

export default BuildingsLayer;
