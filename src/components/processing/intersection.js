/**
 * Javacript class for finding intersection between geojson layers
 * Takes two layers and returns layer containing intersection
 * First input is array of layers
 */

import { intersect } from "@turf/turf";

export function intersectionScript(layers, inputs) {
  let resultLayer = null;
  const layer1 = layers[0];
  const layer2 = layers[1];
  const name = layer1.name + "-intersect-" + layer2.name;
  try {
    const intersectLayer = intersect(layer1, layer2);
    //TODO: If null, show that no intersection found
    if (!intersectLayer) {
      resultLayer = null;
    } else {
      resultLayer = { name: name, data: intersectLayer };
    }
  } catch (error) {
    console.log("Error in intersection: ");
    console.log(error);
    resultLayer = null;
  } finally {
    return resultLayer;
  }
}
