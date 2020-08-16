const calculateTileResources = (field, tile) => {
  if (tile.populace > 0) {
    tile.populace = tile.populace + tile.resources.food;
    tile.development = tile.development + tile.resources.production;
  }

  return tile;
};

export default calculateTileResources;
