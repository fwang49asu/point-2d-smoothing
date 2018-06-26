import * as smoothers from './smoothers';

const defaultAlgorithm = 'IDW';

class Factory {
  constructor(data, settings) {
    this.algorithm = settings.algorithm || defaultAlgorithm;
    this.smoother = new smoothers[this.algorithm](data, settings.options || {});
  }

  estimate(point) {
    // invalid smoother
    if (!this.smoother) {
      return NaN;
    }
    return this.smoother.estimate(point);
  }
}

export default Factory;
