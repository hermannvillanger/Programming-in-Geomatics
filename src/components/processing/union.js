/**
 * Javacript class for finding intersection between geojson layers
 * Takes two layers and returns layer containing intersection
 * First input is array of layers
 */

import { union, buffer } from "@turf/turf";

export function unionScript(layers, inputs) {
  let resultLayer = null;
  const layer1 = layers[0];
  const layer2 = layers[1];
  const name = layer1.name + "-union-" + layer2.name;
  let buffer1 = buffer(layer1.data, 0.1, { units: "meters" });
  let buffer2 = buffer(layer2.data, 0.1, { units: "meters" });

  let feature1 = Object.assign({}, buffer1.features[0]);
  for (let i = 1; i < buffer1.features.length; i++) {
    feature1 = union(feature1, buffer1.features[i]);
  }
  let feature2 = Object.assign({}, buffer2.features[0]);
  for (let i = 1; i < buffer2.features.length; i++) {
    feature2 = union(feature2, buffer2.features[i]);
  }
  const unionLayer = union(feature1, feature2);
  resultLayer = { name: name, data: unionLayer };
  return resultLayer;
}
