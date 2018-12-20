import { buffer, union } from "@turf/turf";
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
  bufferLayer = buffer(bufferLayer, bufferValue, {
    units: "meters"
  });
  //Take the union of all features in the layer and remove the previous properties,
  //as the do not make sense with dissolved data
  if (shouldDissolve) {
    let dissolvedFeature = Object.assign({}, bufferLayer.features[0]);
    for (let i = 1; i < bufferLayer.features.length; i++) {
      dissolvedFeature = union(dissolvedFeature, bufferLayer.features[i]);
    }
    dissolvedFeature.properties = { geometryChanged: "yes" };
    bufferLayer.features = [dissolvedFeature];
  }

  resultLayer = { name: name, data: bufferLayer };
  return resultLayer;
}
