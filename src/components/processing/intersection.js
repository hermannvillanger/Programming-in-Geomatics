/**
 * Javacript class for finding intersection between geojson layers
 * Takes two layers and returns layer containing intersection
 * First input is array of layers
 */

import { intersect, buffer } from "@turf/turf";
//TODO: Check coord system?
export function intersectionScript(layers, inputs) {
  const layer1 = layers[0];
  const layer2 = layers[1];
  const name = layer1.name + "-intersect-" + layer2.name;
  const resultLayer = { name: name };
  const resultData = Object.assign({}, layer1.data);
  resultData.features = [];
  //Perform buffer operation to transform data to polygons
  let buffer1 = buffer(layer1.data, 0.1, { units: "meters" });
  let buffer2 = buffer(layer2.data, 0.1, { units: "meters" });
  for (let i = 0; i < buffer1.features.length; i++) {
    const feature1 = buffer1.features[i];
    for (let j = 0; j < buffer2.features.length; j++) {
      const feature2 = buffer2.features[j];
      const intersectPolygon = intersect(feature1, feature2);
      if (intersectPolygon !== null) {
        resultData.features.push(intersectPolygon);
      }
    }
  }
  if (!resultData.features[0]) {
    return null;
  }
  resultLayer.data = resultData;
  return resultLayer;
}
