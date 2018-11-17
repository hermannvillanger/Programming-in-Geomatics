/**
 * Javacript class for finding intersection between geojson layers
 * Takes two layers and returns layer containing intersection
 * First input is array of layers
 */

import { union } from "@turf/turf";

export function unionScript(layers, inputs) {
  let resultLayer = null;
  const layer1 = layers[0];
  const layer2 = layers[1];
  const name = layer1.name + "-union-" + layer2.name;
  try {
    const unionLayer = union(layer1, layer2);
    resultLayer = { name: name, data: unionLayer };
  } catch (error) {
    console.log("Error in union: ");
    console.log(error);
    resultLayer = null;
  } finally {
    return resultLayer;
  }
}
