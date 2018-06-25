# point-2d-smoothing
Estimate 2D smoothing for 2d coordinates.

# Motivation
This library is to estimate values (smoothing or density) for 2D discret points. It can be geographical coordinates or x,y pairs. However, currently it only supports Euclidean distance, which means that you will get distorted images for latitude and longitude. It would be useful if you have bunch of points and want to get some estimations, such as KDE or a heatmap.

Although this library can achieve reasonable performance through KD tree, Gaussian Blur might be a better alternative if you just want some blurring effect.

# Example

```javascript
import Smoothing from 'point-2d-smoothing';
// only have two peaks
const data = [[0, 0, 1], [1, 1, 1]];
const mySmoothing = new Smoothing({
  data,
  algorithm: 'IDW',
  options: {
    radius: 0.6, // required
  },
});
const point = [0.5, 0.5];
// Inverse Distance Weighting
const idwResult = mySmoothing.estimate(point);
```
