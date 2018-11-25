/**
 * Javacript class for finding difference between geojson layers
 * Takes two layers and show the area of the first layer, excluding the second layer
 */

import { difference, buffer } from "@turf/turf";

export function differenceScript(layers, inputs) {
  const layer1 = layers[0];
  const layer2 = layers[1];
  const name = layer1.name + "-difference-" + layer2.name;
  const resultLayer = { name: name };
  const resultData = Object.assign({}, layer1.data);
  resultData.features = [];
  let buffer1 = buffer(layer1.data, 0.1, { units: "meters" });
  let buffer2 = buffer(layer2.data, 0.1, { units: "meters" });
  //For every feature in layer1, get the rest from taking the difference from every feature in layer2
  //If the result is not null, it does not overlap, and we add the result to our data
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
