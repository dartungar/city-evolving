import { Noise } from "noisejs";
import Tile from "./tile";
import generateRiver from "./generateRiver";

const generateMap = (size, seed) => {
  //import noise from "noisejs";
  // TODO: check if seed is valid

  var noise = new Noise(seed);
  console.log(noise);

  // first stage: generate tiles with elevation
  let tiles = [];
  let id = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      id++;
      // the lesser is x and y divisor, the more 'noisy' maps get
      const elevation =
        (noise.simplex2(x / (size / 2), y / (size / 2)) + 1) / 2;
      //const elevation = noise.noise2d(x, y);
      const tile = new Tile(id, x, y, elevation);
      tiles.push(tile);
    }
  }
  console.log("first stage:", tiles);

  // second stage: add random minor erosion (up to 10% of tile's height)
  tiles.forEach((tile) => {
    tile.elevation -= Math.random() * (tile.elevation / 25);
    console.log("eroded");
  });

  // generate rivers
  tiles = generateRiver(tiles, size, 10);

  // third stage: calculate moisture
  tiles.forEach((tile) => tile.calculateMoisture());

  // fourth stage: calculate biomes based on elevation & moisture

  // fifth stage: calculate resources based on biome
  tiles.forEach((tile) => tile.calculateResources()); // or is forEach in-place?

  console.log("fifth stage:", tiles);
  return tiles;
};

export default generateMap;
