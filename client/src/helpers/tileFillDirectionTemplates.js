const fillSchemes = {
  center: [[8, 3, 9, 2, 1, 5, 7, 6, 4]],
  fromTop: [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [2, 1, 3, 5, 4, 6, 9, 7, 8],
    [3, 2, 1, 6, 4, 5, 8, 9, 7],
  ],
  fromBottom: [
    [7, 8, 9, 4, 5, 6, 1, 2, 3],
    [9, 7, 8, 5, 4, 6, 3, 1, 2],
    [8, 7, 9, 6, 4, 5, 3, 2, 1],
  ],
  fromLeft: [
    [1, 4, 7, 2, 5, 8, 3, 6, 9],
    [2, 6, 9, 1, 4, 7, 3, 5, 8],
    [3, 6, 8, 2, 4, 7, 1, 5, 9],
  ],
  fromRight: [
    [7, 4, 1, 8, 5, 2, 9, 6, 3],
    [8, 6, 2, 7, 4, 1, 9, 5, 3],
    [8, 5, 3, 9, 4, 2, 7, 6, 1],
  ],

  fromTopRight: [[5, 2, 1, 7, 4, 3, 9, 8, 6]],
  fromTopLeft: [[1, 2, 5, 3, 4, 7, 6, 8, 9]],
  fromBottomRight: [[9, 8, 6, 7, 4, 3, 5, 2, 1]],
  fromBottomLeft: [[5, 7, 9, 2, 4, 8, 1, 3, 6]],
};

const chooseFillSchema = (originTile, tile) => {
  let direction;
  if (tile.coordinates.x < originTile.coordinates.x) {
    if (tile.coordinates.y > originTile.coordinates.y) {
      direction = "fromTopRight";
    } else if (tile.coordinates.y === originTile.coordinates.y) {
      direction = "fromRight";
    } else if (tile.coordinates.y < originTile.coordinates.y) {
      direction = "fromBottomRight";
    }
  } else if (tile.coordinates.x === originTile.coordinates.x) {
    if (tile.coordinates.y > originTile.coordinates.y) {
      direction = "fromTop";
    } else if (tile.coordinates.y === originTile.coordinates.y) {
      direction = "center";
    } else if (tile.coordinates.y < originTile.coordinates.y) {
      direction = "fromBottom";
    }
  } else if (tile.coordinates.x > originTile.coordinates.x) {
    if (tile.coordinates.y > originTile.coordinates.y) {
      direction = "fromTopLeft";
    } else if (tile.coordinates.y === originTile.coordinates.y) {
      direction = "fromLeft";
    } else if (tile.coordinates.y < originTile.coordinates.y) {
      direction = "fromBottomLeft";
    }
  } else console.log("direction not found!");

  const fillSchemesForChosenDirection = fillSchemes[direction];

  const chosenSchema =
    fillSchemesForChosenDirection[
      Math.floor(Math.random() * fillSchemesForChosenDirection.length)
    ];
  console.log("chosen schema:", chosenSchema);
  return chosenSchema;
};

export default chooseFillSchema;
