const calculateGameScore = (field) => {
  const totalScore = { population: 0, development: 0, wealth: 0 };

  field.map((tile) => {
    if (tile.population > 0) {
      totalScore.population = totalScore.population + tile.population;
      totalScore.development = totalScore.development + tile.development;
      totalScore.wealth = totalScore.wealth + tile.wealth;
    }
  });
  console.log(totalScore);
  return totalScore;
};

export default calculateGameScore;
