require("babel-core/register");
const Smoother = require('../dist').default;

const data = [{
  x: 0.25,
  y: 0.25,
  value: 1,
}, {
  x: 0.75,
  y: 0.75,
  value: 1,
}];
const p = {
  x: 0.25,
  y: 0.25,
};

const mySmoother = new Smoother(data, {
  algorithm: 'KDE',
  options: {
    kernel: 'epanechnikov',
    bandwidth: 0.4,
  },
});

console.log(mySmoother.estimate(p))
