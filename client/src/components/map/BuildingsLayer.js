import React, { useEffect, useContext, useState, useRef } from "react";
import MapContext from "../../context/map/mapContext";
import GameContext from "../../context/game/gameContext";
import ModalContext from "../../context/modal/modalContext";

const BuildingsLayer = ({ sizeInPx }) => {
  const mapContext = useContext(MapContext);
  const { mapSize, tileSize, tiles } = mapContext;

  const gameContext = useContext(GameContext);
  const { turns } = gameContext;

  const [image, setImage] = useState();
  const canvasRef = useRef(null);
  const [canvasContext, setCanvasContext] = useState();

  useEffect(() => {
    const img = new Image(112, 832);
    img.src = "./tileset.png";
    setImage(img);
    console.log(img);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setCanvasContext(context);
  }, []);

  // draw tiles after map is initialized
  // TODO: get rid of magic '16' tile size
  // on page load, init canvas
  useEffect(() => {
    //console.log("will redraw buildings...or not?");
    if (mapSize !== null && tiles.length > 0) {
      //console.log("redrawing tiles...");
      tiles.forEach((tile) => {
        drawBuildingTile(canvasContext, tileSize, tile);
      });
    }
  }, [turns]);

  const drawBuildingTile = (context, tileSize, tile) => {
    //console.log("drawing tiles for tile", tile);
    //context.fillStyle = getElevationColor(tile);
    //console.log(context.fillStyle);
    const tileSrcCoords = getTileSrcCoords(tile);
    //console.log("coordinates for tile image: ", tileSrcCoords);
    if (tileSrcCoords) {
      context.clearRect(
        tile.coordinates.x * tileSize,
        tile.coordinates.y * tileSize,
        tileSize,
        tileSize
      );

      if (tile.developmentLevel > 1) {
        console.log("drawing cultivated ground");
        drawCultivatedGroundTile(canvasContext, tileSize, tile);
      }

      // draw building sprite
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
    }
  };

  // 'town' ground aka roads
  const drawCultivatedGroundTile = (context, tileSize, tile) => {
    context.fillStyle = "gainsboro";

    context.fillRect(
      tile.coordinates.x * tileSize,
      tile.coordinates.y * tileSize,
      tileSize,
      tileSize
    );
  };

  // TODO: get building icon src by development level
  const getTileSrcCoords = (tile) => {
    switch (tile.developmentLevel) {
      case 1:
        return [32, 80];
      case 2:
        return [0, 16];
      case 3:
        return [32, 16];
      case 4:
        return [0, 48];
      case 5:
        return [32, 64];
      case 6:
        return [32, 80];
      case tile.developmentLevel >= 7:
        return [96, 64];

      default:
        return null;
    }
    // if (tile.elevation >= 0.4 && tile.elevation < 0.6) {
    //   return [96, 0];
    // } else return [0, 817];
  };

  const tileBorderLayerStyle = {
    position: "absolute",
    right: `${sizeInPx}`,
    zIndex: "200",
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
