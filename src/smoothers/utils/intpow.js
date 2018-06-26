// fast alternative to Math.pow, only works for:
// degree >= 0 && degree is integer
// use multiply to replace expensive pow operations
export default (base, degree) => {
  let result = 1;
  for (let i = 0; i < degree; i += 1) {
    result *= base;
  }
  return result;
};
