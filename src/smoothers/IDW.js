import Base from './Base';

const defaultOptions = {
  degree: 2,
  radius: 1,
};

class IDW extends Base {
  deriveOptions() {
    return Object.assign({}, defaultOptions, this.options);
  }

  estimate(point) {
    return 0;
  }
}

export default IDW;
