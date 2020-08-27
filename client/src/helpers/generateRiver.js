import getAdjacentTiles from "./getAdjacentTiles";

const generateRiverFromHighPoint = (tiles, mapSize, minHeight) => {
  let riverTiles = [];

  let currentTile = getRandomTileOfSetElevation(tiles, minHeight, mapSize);
  riverTiles.push(currentTile);

  while (true) {
    console.log("will add tile to river:", currentTile);
    riverTiles.push(currentTile);
    // stop if we reached map border
    if (checkIfTileIsBorder(tiles, currentTile, mapSize) === true) {
      break;
    }
    // try to get lower tile nearby
    let nextTile = getNextTileForRiver(tiles, riverTiles, currentTile);
    // if we fail, 'fill up a lake' - get lowest tile out of tiles that are higher than current
    if (nextTile === null) {
      console.log("no lower tile found, starting to fill up the lake...");
      nextTile = getNextTileForLake(tiles, riverTiles, currentTile);
    }
    nextTile.elevation = currentTile.elevation;
    currentTile = nextTile;
  }

  console.log("river tiles: ", riverTiles);

  tiles = addRiverToMap(tiles, riverTiles);
  console.log("new tiles with river", tiles);
  return tiles;
};

// check if tile is not already in array
const checkIfTileIsInArray = (tiles, tile) => {
  for (let t of tiles) {
    if (t.id === tile.id) {
      console.log("tile is in array! ", t, tile);
      return true;
    }
  }
  return false;
};

// get adjacent tiles that are not already river
const getAdjacentTilesNotRiver = (tiles, riverTiles, originTile) => {
  let adjacentTiles = getAdjacentTiles(tiles, originTile, 2);
  console.log("adjacent tiles for river: ", adjacentTiles);
  adjacentTiles = adjacentTiles.filter(
    (tile) => checkIfTileIsInArray(riverTiles, tile) === false
  );
  console.log("adjacent tiles that are not river:", adjacentTiles);
  return adjacentTiles;
};

// get random tile of minimun elevation of x
const getRandomTileOfSetElevation = (tiles, elevation, mapSize) => {
  const highTiles = tiles.filter(
    (tile) =>
      tile.elevation >= elevation &&
      checkIfTileIsBorder(tiles, tile, mapSize) === false
  );
  // TODO: make sure tile is far enough from borders
  const randomHighTile =
    highTiles[Math.floor(Math.random() * highTiles.length)];
  console.log("random high tile: ", randomHighTile);
  return randomHighTile;
};

// find lowest tile in array
const getLowestTile = (tiles) => {
  return tiles.sort((tileA, tileB) => tileA.elevation - tileB.elevation)[0];
};

// find lowest tile adjacent to map border
const getLowestTileNearBorder = (tiles, mapSize) => {
  const tilesNearBorder = getBorderTiles(tiles, mapSize);

  return getLowestTile(tilesNearBorder);
};

// check if tile is border tile
const checkIfTileIsBorder = (tiles, tile, mapSize) => {
  if (
    tile.coordinates.x === 0 ||
    tile.coordinates.x === mapSize - 1 ||
    tile.coordinates.y === 0 ||
    tile.coordinates.y === mapSize - 1
  ) {
    return true;
  }
  return false;
};

// get tiles near border
const getBorderTiles = (tiles, mapSize) => {
  return tiles.filter(
    (tile) =>
      tile.coordinates.x === 0 ||
      tile.coordinates.x === mapSize - 1 ||
      tile.coordinates.y === 0 ||
      tile.coordinates.y === mapSize - 1
  );
};

// get lowest adjacent tiles which is lower than current tile
const getNextTileForRiver = (tiles, riverTiles, currentTile) => {
  let adjacentTiles = getAdjacentTilesNotRiver(tiles, riverTiles, currentTile);
  adjacentTiles = adjacentTiles.filter(
    (tile) => tile.elevation < currentTile.elevation
  );
  if (adjacentTiles.length > 0) {
    return getLowestTile(adjacentTiles);
  } else return null;
};

// get lowest adjacent tiles which is higher than current tile
const getNextTileForLake = (tiles, riverTiles, currentTile) => {
  let adjacentTiles = getAdjacentTilesNotRiver(tiles, riverTiles, currentTile);
  adjacentTiles = adjacentTiles.filter(
    (tile) => tile.elevation > currentTile.elevation
  );
  if (adjacentTiles.length > 0) {
    return getLowestTile(adjacentTiles);
  } else return null;
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

  console.log("watered tiles:", tiles);
  return tiles;
};

export default generateRiverFromHighPoint;
