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
  x: 0.5,
  y: 0.5,
};

const mySmoother = new Smoother(data, {
  algorithm: 'IDW',
  options: {
    radius: 0.6,
    degree: 2,
  },
});

console.log(mySmoother.estimate(p))
