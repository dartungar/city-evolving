const calculateTileResources = (field, tile) => {
  if (tile.population > 0) {
    tile.population = tile.population + tile.resources.food;
    tile.development = tile.development + tile.resources.production;
    tile.wealth =
      tile.wealth +
      (tile.resources.gold * ((tile.development * tile.population) / 10)) /
        tile.population;
    tile.desireToExpand =
      tile.desireToExpand + (tile.population * 2) / tile.development;
  }
  return tile;
};

export default calculateTileResources;
