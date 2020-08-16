import React, { useEffect, useContext, useState } from "react";
import GameContext from "../../context/game/gameContext";
import Tile from "../tile/Tile";

const Field = () => {
  const gameContext = useContext(GameContext);
  const { size, setSize, tiles, initField, populateFirstTile } = gameContext;
  const [isFirstTilePopulated, setIsFirstTilePopulated] = useState();

  useEffect(() => {
    if (size === null) {
      setSize(10);
    }

    if (size !== null && tiles.length === 0) {
      initField(size);
    }

    // eslint-disable-next-line
  }, [size, tiles]);

  useEffect(() => {
    setIsFirstTilePopulated(false);
  }, []);

  useEffect(() => {
    console.log(tiles.length, isFirstTilePopulated);
    if (tiles.length > 0 && isFirstTilePopulated === false) {
      console.log("populating first tile...");
      populateFirstTile(tiles);
      setIsFirstTilePopulated(true);
    }
  }, [tiles, isFirstTilePopulated, populateFirstTile]);

  const fieldStyle = {
    display: "grid",
    gridTemplateRows: `repeat(${size}, 4rem)`,
    gridTemplateColumns: `repeat(${size}, 4rem)`,
    gridGap: "1px",
    //justifyContent: "center",
    //alignContent: "center",
    padding: "1px",
    border: "1rem solid royalblue",
  };

  return (
    <div style={fieldStyle}>
      {tiles && tiles.map((tile) => <Tile tile={tile} key={tile.id} />)}
    </div>
  );
};

export default Field;
