import { buffer, union } from "@turf/turf";
/**
 * Adds a buffer around the input layer and returns the new buffered layer.
 * @param {Array} layers Array of layers. Contains 1 layer in this operation
 * @param {Array|Null} inputs Array of inputs. Containts 2 inputs in this operation
 */
export function bufferScript(layers, inputs) {
  const layer = layers[0];
  const bufferValue = inputs[0];
  const shouldDissolve = inputs[1];
  const name = layer.name + "-Buf-" + bufferValue + "m";

  const resultLayer = { name: name };
  const resultData = Object.assign({}, layer.data);

  const bufferLayer = buffer(layer.data, bufferValue, {
    units: "meters"
  });
  //Dissolve all buffer features
  if (shouldDissolve) {
    bufferLayer.features = dissolveFeatures(bufferLayer.features);
  }
  resultData.features = bufferLayer.features;
  resultLayer.data = resultData;
  return resultLayer;
}
/**
 * Takes the union a feature to all other features, removes the previous properties
 * as they no longer makes sense with our dissolved features
 */
function dissolveFeatures(features) {
  let dissolvedFeature = Object.assign({}, features[0]);
  for (let i = 1; i < features.length; i++) {
    dissolvedFeature = union(dissolvedFeature, features[i]);
  }
  dissolvedFeature.properties = { geometryChanged: "yes" };
  return [dissolvedFeature];
}
