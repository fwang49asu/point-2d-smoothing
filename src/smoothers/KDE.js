import { sum } from 'lodash';
import Base from './Base';

import {
  euclideanDistance as getDistance,
} from './utils';

const defaultOptions = {
  kernel: 'epanechnikov',
  bandwidth: 1,
};

const defaultAlgorithmOptions = {
  gaussian: {
    searchRatio: 3,
  },
  tophat: {
    searchRatio: 1,
  },
  epanechnikov: {
    searchRatio: 1,
  },
  linear: {
    searchRatio: 1,
  },
  cosine: {
    searchRatio: 1,
  },
};

const kernels = {
  gaussian: u => (Math.exp(-0.5 * u * u) / Math.sqrt(2 * Math.PI)),
  tophat: u => (Math.abs(u) <= 1 ? 0.5 : 0),
  epanechnikov: u => (Math.abs(u) <= 1 ? ((1 - u * u) / (2 * Math.PI)) : 0),
  linear: u => (Math.abs(u) <= 1 ? (1 - Math.abs(u)) : 0),
  cosine: u => (Math.abs(u) <= 1 ? (Math.PI / 4 * Math.cos(Math.PI * 0.5 * u)) : 0),
};

class KDE extends Base {
  deriveOptions() {
    const result = Object.assign({}, defaultOptions, this.options);
    return Object.assign({}, result, defaultAlgorithmOptions[result.kernel], this.options);
  }

  estimate(point) {
    const {
      bandwidth,
      searchRatio,
      kernel,
    } = this.options;
    const nodes = [];
    this.tree.rnn([point.x, point.y], bandwidth * searchRatio, (idx) => {
      nodes.push(this.data[idx]);
    });

    const kernelFunc = kernels[kernel];

    const nodesToUse = nodes.map(d => Object.assign({}, d, {
      distance: getDistance(d, point, true),
    })).map(d => Object.assign({}, d, { kernel: kernelFunc(d.distance / bandwidth) }));
    return this.data.length > 0
      ? (sum(nodesToUse.map(d => d.kernel)) / this.data.length / bandwidth) : 0;
  }
}

export default KDE;
