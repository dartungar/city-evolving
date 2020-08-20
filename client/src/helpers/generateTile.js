const generateTile = (id, x, y) => {
  // tile types
  const terrainTypes = [
    { name: "plains", resources: { food: 3, production: 1, gold: 2 } },
    { name: "woods", resources: { food: 1, production: 2, gold: 0.1 } },
    { name: "hills", resources: { food: 1, production: 3, gold: 1 } },
    { name: "river", resources: { food: 2, production: 0, gold: 0 } },
    {
      name: "mountains",
      resources: { food: 0.2, production: 1, gold: 3 },
    },
  ];

  // calculate appeal of the tile based on resources
  const calculateTileAppeal = (resources) => {
    const { food, production, gold } = resources;
    const appeal = food * 2 + production + gold * 1.5;
    return appeal;
  };

  // TODO: initialize resources based on adjacent tiles?

  // randomly choose terrain type
  const terrain = terrainTypes[Math.floor(Math.random() * terrainTypes.length)];

  // initialize tile object
  const tile = {
    id: id,
    coordinates: { x: x, y: y },
    terrain: terrain.name,
    isWater: terrain.name === "river" ? true : false,
    resources: terrain.resources,
    appeal: calculateTileAppeal(terrain.resources),
    population: 0,
    fillSchema: null,
    development: 0,
    wealth: 0,
    desireToExpand: 0,
  };

  return tile;
};

export default generateTile;
