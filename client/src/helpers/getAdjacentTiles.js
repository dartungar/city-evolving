// get adjacent tiles
const getAdjacentTiles = (tiles, originTile, radius) => {
  const isAdjacent = (tileToCompare, originTile) => {
    if (
      tileToCompare.coordinates.x > originTile.coordinates.x - radius &&
      tileToCompare.coordinates.x < originTile.coordinates.x + radius
    ) {
      if (
        tileToCompare.coordinates.y > originTile.coordinates.y - radius &&
        tileToCompare.coordinates.y < originTile.coordinates.y + radius
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
