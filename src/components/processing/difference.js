/**
 * Javacript class for finding difference between geojson layers
 * Takes two layers and show the area of the first layer, excluding the second layer
 */

import { difference } from "@turf/turf";

export function differenceScript(layers, inputs) {
  let resultLayer = null;
  const layer1 = layers[0];
  const layer2 = layers[1];
  const name = layer1.name + "-union-" + layer2.name;
  try {
    const differenceLayer = difference(layer1, layer2);
    resultLayer = { name: name, data: differenceLayer };
  } catch (error) {
    console.log("Error in difference: ");
    console.log(error);
    resultLayer = null;
  } finally {
    return resultLayer;
  }
}
