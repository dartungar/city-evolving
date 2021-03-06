// get adjacent tiles
const getAdjacentTiles = (tiles, originTile) => {
  const isAdjacent = (tileToCompare, originTile) => {
    if (
      tileToCompare.coordinates.x > originTile.coordinates.x - 4 &&
      tileToCompare.coordinates.x < originTile.coordinates.x + 4
    ) {
      if (
        tileToCompare.coordinates.y > originTile.coordinates.y - 4 &&
        tileToCompare.coordinates.y < originTile.coordinates.y + 4
      ) {
        if (
          tileToCompare.coordinates.x === originTile.coordinates.x &&
          tileToCompare.coordinates.y === originTile.coordinates.y
        ) {
          return false;
        }
        return true;
      }
    }
    return false;
  };

  const adjacentTiles = tiles.filter((tile) => isAdjacent(tile, originTile));

  return adjacentTiles;
};

export default getAdjacentTiles;
