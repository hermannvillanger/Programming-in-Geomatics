/**
 * Javacript class for finding difference between geojson layers
 * Takes two layers and show the area of the first layer, excluding the second layer
 */

import { difference, buffer } from "@turf/turf";
/**
 * Takes two layers and returns the part of the first which does not overlap any part of the second
 * @param {Array} layers Array of layers. Contains 2 layers in this operation
 * @param {Array|Null} inputs Array of inputs. Null in this operation
 */
export function differenceScript(layers, inputs) {
  const layer1 = layers[0];
  const layer2 = layers[1];
  const name = layer1.name + "-Diff-" + layer2.name;

  const resultLayer = { name: name };
  const resultData = Object.assign({}, layer1.data);

  //Perform buffer operation to transform data to polygons
  let buffer1 = buffer(layer1.data, 0.1, { units: "meters" });
  let buffer2 = buffer(layer2.data, 0.1, { units: "meters" });

  resultData.features = layerDifference(buffer1.features, buffer2.features);

  if (resultData.features.length === 0) {
    return null;
  } else {
    resultLayer.data = resultData;
    return resultLayer;
  }
}
/**
 * For each feature in features1, take the difference from all features in features2.
 * If the result is not null we add the difference to a new feature list
 */
export function layerDifference(features1, features2) {
  const newFeatures = [];
  for (let i = 0; i < features1.length; i++) {
    let nextFeature = Object.assign({}, features1[i]);
    for (let j = 0; j < features2.length; j++) {
      nextFeature = difference(nextFeature, features2[j]);
      if (nextFeature === null) {
        break;
      }
    }
    if (nextFeature !== null) {
      newFeatures.push(nextFeature);
    }
  }
  return newFeatures;
}
