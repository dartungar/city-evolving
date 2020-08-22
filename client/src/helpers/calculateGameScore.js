const calculateGameScore = (field) => {
  const totalScore = { population: 0, materials: 0, gold: 0 };

  field.forEach((tile) => {
    if (tile.population > 0) {
      totalScore.population = totalScore.population + tile.population;
      totalScore.materials = totalScore.materials + tile.materials;
      totalScore.gold = totalScore.gold + tile.gold;
    }
  });
  console.log(totalScore);
  return totalScore;
};

export default calculateGameScore;
