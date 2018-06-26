import createKDTree from 'static-kdtree';

class Base {
  constructor(data, options) {
    this.data = data;
    this.options = options;
    this.options = this.deriveOptions();
    this.tree = createKDTree(data.map(d => [d.x, d.y]));
    this.init();
  }

  // eslint-disable-next-line class-methods-use-this
  deriveOptions() {
    return {};
  }

  // eslint-disable-next-line class-methods-use-this
  init() {}

  // eslint-disable-next-line class-methods-use-this
  estimate() {
    return 0;
  }
}

export default Base;
