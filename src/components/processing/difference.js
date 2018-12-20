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
  const name = layer1.name + "-difference-" + layer2.name;
  const resultLayer = { name: name };
  const resultData = Object.assign({}, layer1.data);
  resultData.features = [];
  let buffer1 = buffer(layer1.data, 0.1, { units: "meters" });
  let buffer2 = buffer(layer2.data, 0.1, { units: "meters" });
  /**
   * For each feature in layer1, take the difference from all features in layer2.
   * If the result is not null we add the difference to a new layer
   */
  for (let i = 0; i < buffer1.features.length; i++) {
    let nextFeature = Object.assign({}, buffer1.features[i]);
    for (let j = 0; j < buffer2.features.length; j++) {
      nextFeature = difference(nextFeature, buffer2.features[j]);
      if (nextFeature === null) {
        break;
      }
    }
    if (nextFeature !== null) {
      resultData.features.push(nextFeature);
    }
  }
  if (!resultData.features[0]) {
    return null;
  }
  resultLayer.data = resultData;
  return resultLayer;
}