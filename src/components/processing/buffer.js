/**
 * Javacript class for creating buffer around geojson file
 * Takes layer file and buffer amount as input
 * returns buffered layer file
 * First input is array of layers, here 1
 * Second is array of inputs, here buffer distance and dissolve option
 */
import { buffer, dissolve } from "@turf/turf";

export function bufferScript(layers, inputs) {
  let resultLayer = null;
  const layer = layers[0];
  const bufferValue = inputs[0];
  const shouldDissolve = inputs[1];
  const name = layer.name + "-buffer-" + bufferValue + "m";

  let bufferLayer = layer.data;

  bufferLayer = buffer(bufferLayer, bufferValue, {
    units: "meters"
  });
  //We remove the previous properties from the layer, as they do not make sense with the changed geometry,
  //and to maintain consistence with the attribute selector
  bufferLayer.features.forEach(feature => {
    feature.properties = { geometryChanged: "geometryChanged" };
  });
  if (shouldDissolve) {
    bufferLayer = dissolve(bufferLayer, { propertyName: "geometryChanged" });
  }
  resultLayer = { name: name, data: bufferLayer };
  return resultLayer;
}
