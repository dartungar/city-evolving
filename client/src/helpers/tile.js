import getAdjacentTiles from "../helpers/getAdjacentTiles";
import chooseAdjacentTileToPopulate from "../helpers/populateTile";

class Tile {
  constructor(id, x, y, elevation) {
    this.id = id;
    this.coordinates = { x, y };
    this.elevation = elevation;
    this.resources = null; // todo
    this.appeal = null;
    this.moisture = null; // todo
    this.isWater = false;
    this.isRiver = false;
    this.biome = null; // todo
    this.population = 0;
    this.materials = 0;
    this.gold = 0;
    this.developmentLevel = 0;
  }

  setWaterToTrue = function () {
    this.isWater = true;
  };

  calculateMoisture = function () {
    // todo
    if (this.isWater === false) {
      this.isWater = this.elevation < 0.1 && true;
    }
  };

  calculateResources = function () {
    // todo: algo
    this.resources = {
      food: Math.floor((2 - this.elevation) * 10) - 10, // the higher we get, the less there is fool. TODO: food based on biome
      production: Math.ceil(Math.random() * 10), // TODO: less randome-y production
      trade: 0,
    };
    this.appeal =
      this.resources.food + this.resources.production + this.resources.trade;
  };

  // calculate title's worth each turn
  calculateChangesOnTurn = function () {
    // todo
    if (this.population > 0) {
      this.population += this.resources.food / 3; // TODO:
      this.materials += this.resources.production;
      this.gold += this.resources.trade;
      //console.log("calculated changes on turn", this.id, this);
    }
  };

  decideIfSettle = function () {
    // 'housing capacity' is current development level ^ 3
    const capacity = Math.pow(this.developmentLevel, 2) * 10;
    if (this.population > capacity) {
      return true;
    }
  };

  decideIfUpgrade = function () {
    // 'price to upgrade' is current development level ^ 3
    // todo: buy upgrades with gold
    if (this.population > 0) {
      if (this.developmentLevel === 0) {
        this.developmentLevel = 1;
      } else {
        const priceToUpgrade = Math.pow(this.developmentLevel, 3) * 10;
        if (this.materials > priceToUpgrade) {
          this.developmentLevel += 1;
          this.materials -= this.materials;
          this.resources.trade += 1;
        }
      }
    }
  };

  getAdjacentTilesInfo = function (tiles) {
    // todo
  };

  chooseTileToPopulate = function (tiles) {
    return chooseAdjacentTileToPopulate(tiles, this);
  };
}

export default Tile;
