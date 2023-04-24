export const getColor = (hue = 70) => `hsl(
  ${360 * Math.random()},
  ${(25 + 70 * Math.random())}%, 
  ${(hue + 10 * Math.random())}%
)`;

export const generateObstacles = (amount = 128) => {
  const obstacles = [];
  for (let i = 0; i < amount; i++) {
    obstacles.push({
      positionZ: i === 0 ? 12 : (obstacles[i-1].positionZ + 8) + Math.floor(Math.random() * 12),
      type: Math.floor(Math.random() * 4)
    });
  }
  return obstacles;
};
