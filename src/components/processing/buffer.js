import { buffer, dissolve } from "@turf/turf";
/**
 * Adds a buffer around the input layer and returns the new buffered layer.
 * @param {Array} layers Array of layers. Contains 1 layer in this operation
 * @param {Array|Null} inputs Array of inputs. Containts 2 inputs in this operation
 */
export function bufferScript(layers, inputs) {
  let resultLayer = null;
  const layer = layers[0];
  const bufferValue = inputs[0];
  const shouldDissolve = inputs[1];
  const name = layer.name + "-buffer-" + bufferValue + "m";

  let bufferLayer = layer.data;
  //Create the buffer
  bufferLayer = buffer(bufferLayer, bufferValue, {
    units: "meters"
  });
  //If we dissolve, we also remove the previous properties, as the do not make sense with dissolved data
  if (shouldDissolve) {
    bufferLayer = dissolve(bufferLayer, { propertyName: "geometryChanged" });
    bufferLayer.features.forEach(feature => {
      feature.properties = { geometryChanged: "yes" };
    });
  }
  resultLayer = { name: name, data: bufferLayer };
  return resultLayer;
}
