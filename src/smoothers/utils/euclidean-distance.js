export default (a, b, isSqud) => {
  const diff = {
    x: a.x - b.x,
    y: a.y - b.y,
  };
  const result = (diff.x * diff.x) + (diff.y * diff.y);
  return isSqud ? result : Math.sqrt(result);
};
