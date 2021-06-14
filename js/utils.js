const circleCollision = (circleA, circleB) => {
  const distanceX = circleA.x - circleB.x;
  const distanceY = circleA.y - circleB.y;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  return distance < circleA.radius + circleB.radius;
};

export default circleCollision;
