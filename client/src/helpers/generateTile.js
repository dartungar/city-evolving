const generateTile = (id, x, y) => {
  // tile types
  const terrainTypes = [
    { name: "plains", resources: { food: 3, production: 1, gold: 0 } },
    { name: "woods", resources: { food: 1, production: 2, gold: 0 } },
    { name: "hills", resources: { food: 1, production: 3, gold: 1 } },
    { name: "river", resources: { food: 2, production: 0, gold: 0 } },
    {
      name: "mountains",
      resources: { food: 0.2, production: 1, gold: 2 },
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
    resources: terrain.resources,
    appeal: calculateTileAppeal(terrain.resources),
    populace: 0,
    development: 0,
    isWater: terrain.name === "river" ? true : false,
  };

  return tile;
};

export default generateTile;
