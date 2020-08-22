import getAdjacentTiles from "./getAdjacentTiles";

// populate adjacent tile from origin tile
const chooseAdjacentTileToPopulate = (map, originTile) => {
  let adjacentTiles = getAdjacentTiles(map, originTile);
  console.log("adjacent tiles:", adjacentTiles);
  // remove tiles that are water
  adjacentTiles = adjacentTiles.filter((tile) => tile.isWater === false);
  console.log(adjacentTiles);
  // remove tiles that are already populated
  adjacentTiles = adjacentTiles.filter((tile) => tile.population === 0);

  // correct appeal based on distance from original tile
  // prefer closest tiles

  adjacentTiles.forEach((tile) => {
    tile.distanceFromOrigin =
      Math.abs(originTile.coordinates.x - tile.coordinates.x) +
      Math.abs(originTile.coordinates.y - tile.coordinates.y);
    tile.appeal /= tile.distanceFromOrigin;
  });

  // calculate the maximum possible appeal amongst adjacent tiles
  const appealValues = adjacentTiles.map((tile) => tile.appeal);
  const maximumAppeal = Math.max(...appealValues);

  // choose the best tiles to populate based on resources
  const bestTiles = adjacentTiles.filter(
    (tile) => tile.appeal === maximumAppeal
  );
  // return first tile with best value
  console.log(
    "the best tile distance:",
    bestTiles[0].distanceFromOrigin,
    bestTiles[0].appeal
  );
  return bestTiles[0];
};

export default chooseAdjacentTileToPopulate;
