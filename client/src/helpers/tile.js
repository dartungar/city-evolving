class Tile {
  constructor(id, x, y, elevation) {
    this.id = id;
    this.coordinates = { x, y };
    this.elevation = elevation; // TODO
    this.resources = null; // todo
    this.moisture = null; // todo
    this.biome = null; // todo
    this.population = null;
    this.developmentLevel = null;
    this.production = null;
    this.gold = null;
  }

  calculateMoisture = function () {
    // todo
  };

  calculateResources = function () {
    // todo: algo
    this.resources = {
      food: Math.floor((2 - this.elevation) * 10), // the higher we get, the less there is fool. TODO: food based on biome
      production: Math.ceil(Math.random() * 10), // TODO: less randome-y production
      trade: 0,
    };
  };

  calculateChangesOnTurn = function () {
    // todo
    this.population += 0;
    this.materials += 0;
    this.gold += 0;
  };

  decideIfSettle = function () {
    // 'housing capacity' is current development level ^ 3
    const capacity = Math.pow(this.developmentLevel, 3) * 10;
    if (this.population > capacity) {
      return true;
    }
  };

  decideIfUpgrade = function () {
    // 'price to upgrade' is current development level ^ 3
    // todo: buy upgrades with gold
    const priceToUpgrade = Math.pow(this.developmentLevel, 3) * 10;
    if (this.materials > priceToUpgrade) {
      this.developmentLevel += 1;
      this.materials -= this.materials;
      this.resources.trade += 1;
    }
  };
  getAdjacentTilesInfo = function () {
    // todo
  };
}

export default Tile;
