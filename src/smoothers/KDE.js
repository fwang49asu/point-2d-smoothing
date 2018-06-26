import Base from './Base';

const defaultOptions = {
  kernel: 'Epanechnikov',
};

class KDE extends Base {
  deriveOptions() {
    return Object.assign({}, defaultOptions, this.options);
  }
}

export default KDE;
