import getAdjacentTiles from "./getAdjacentTiles";

const generateRiver = (tiles, mapSize, riverLength) => {
  let riverTiles = [];

  const lowestBorderTile = getLowestTileNearBorder(tiles, mapSize);
  console.log(lowestBorderTile);

  riverTiles.push(lowestBorderTile);

  let currentTile = lowestBorderTile;

  for (let i = 0; i < riverLength; i++) {
    let nextRiverTile = getNextTileForRiver(tiles, currentTile);
    riverTiles.push(nextRiverTile);
    currentTile = nextRiverTile;
  }
  console.log("river tiles: ", riverTiles);

  tiles = addRiverToMap(tiles, riverTiles);
  console.log("new tiles with river", tiles);
  return tiles;
};

// find lowest tile in array
const getLowestTile = (tiles) => {
  return tiles.sort((tileA, tileB) => tileA.elevation - tileB.elevation)[0];
};

// find lowest tile adjacent to map border
const getLowestTileNearBorder = (tiles, mapSize) => {
  const tilesNearBorder = tiles.filter(
    (tile) =>
      tile.coordinates.x === 0 ||
      tile.coordinates.x === mapSize - 1 ||
      tile.coordinates.y === 0 ||
      tile.coordinates.y === mapSize - 1
  );

  return getLowestTile(tilesNearBorder);
};

// get lowest adjacent tiles which is higher than current tile
const getNextTileForRiver = (tiles, currentTile) => {
  let adjacentTiles = getAdjacentTiles(tiles, currentTile, 2);
  adjacentTiles = adjacentTiles.filter(
    (tile) => tile.elevation > currentTile.elevation
  );
  return getLowestTile(adjacentTiles);
};

// embed river tiles into map
const addRiverToMap = (tiles, riverTiles) => {
  tiles.forEach((tile) => {
    riverTiles.forEach((riverTile) => {
      if (tile.id === riverTile.id) {
        tile.isWater = true;
        tile.isRiver = true;
        tile.elevation -= 0.5;
        console.log("applied river tile!", tile);
      }
    });
  });

  //   const checkIfTileIsRiverTile = (tile, riverTiles) => {
  //     let isRiverTile = false;
  //     riverTiles.forEach((riverTile) => {
  //       if (tile.id === riverTile.id) {
  //         isRiverTile = true;
  //       }
  //     });
  //     return isRiverTile;
  //   };

  //   const wateredTiles = tiles.map((tile) => {
  //     const isRiverTile = checkIfTileIsRiverTile(tile, riverTiles);
  //     console.log("isRiverTile: ", isRiverTile);
  //     if (isRiverTile === true) {
  //       console.log("tile is a river tile!");
  //       tile.isWater = true;
  //       console.log("set tile.isWater to true!", tile);
  //     }
  //     return tile;
  //   });

  console.log("watered tiles:", tiles);
  return tiles;
};

export default generateRiver;
