import { mean } from 'lodash';

import Base from './Base';
import {
  intPow,
  euclideanDistance as getDistance,
  epsilon,
} from './utils';

const defaultOptions = {
  degree: 2,
  radius: 1,
};

class IDW extends Base {
  deriveOptions() {
    return Object.assign({}, defaultOptions, this.options);
  }

  estimate(point) {
    const nodes = [];
    const {
      degree,
      radius,
    } = this.options;
    this.tree.rnn([point.x, point.y], radius, (idx) => {
      nodes.push(this.data[idx]);
    });

    const nodesToUse = nodes.map(d => Object.assign({}, d, {
      distance: getDistance(d, point),
    }));

    const exactMatchedNodes = nodesToUse.filter(d => d.distance < epsilon);
    // if we got exact match nodes, just use their average
    if (exactMatchedNodes.length > 0) {
      return mean(exactMatchedNodes.map(d => d.value));
    }
    // IDW algorithm
    let result = 0;
    let base = 0;
    nodesToUse.forEach((d) => {
      const distance = intPow(d.distance, degree);
      base += distance;
      result += distance * d.value;
    });
    return base < epsilon ? 0 : (result / base);
  }
}

export default IDW;
