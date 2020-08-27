// get closest tile with water
const getClosestTileWithWater = (tiles, tile) => {
  let tilesWithWater = tiles.map((t) => {
    if (t.isWater) {
      let distanceX = Math.abs(t.coordinates.x - tile.coordinates.x);
      let distanceY = Math.abs(t.coordinates.x - tile.coordinates.x);
      t.distance = distanceX + distanceY;
      t.elevationDiff = Math.abs(tile.elevation - t.elevation);
      return t;
    }
  });
  tilesWithWater = tilesWithWater.sort(
    (tileA, tileB) => tileA.distance - tileB.distance
  );
  console.log(tilesWithWater[0]);
  return tilesWithWater[0];
};

// calculate tile moisture based on closest water tile
// TODO: account for how much water tiles there is nearby
const calculateTileMoisture = (tiles, tile) => {
  const closestWaterTile = getClosestTileWithWater(tiles, tile);
  console.log("closest water tile: ", closestWaterTile);
  const distance = closestWaterTile.distance;
  const elevationDiff = closestWaterTile.elevationDiff;
  // TODO: better algo
  const moisture = 100 - (distance + elevationDiff * 100);
  console.log("calculated moisture:", moisture, tile);
  return moisture;
};

export default calculateTileMoisture;
