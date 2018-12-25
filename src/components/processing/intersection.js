import { buffer } from "@turf/turf";
import { layerDifference } from "./difference";
/**
 * Takes two layers and returns a new layer containing the intersection between them
 * @param {Array} layers Array of layers. Contains 2 layers in this operation
 * @param {Array|Null} inputs Array of inputs. Null in this operation
 */
export function intersectionScript(layers, inputs) {
  const layer1 = layers[0];
  const layer2 = layers[1];
  const name = layer1.name + "-Int-" + layer2.name;

  const resultLayer = { name: name };
  const resultData = Object.assign({}, layer1.data);

  //Perform buffer operation to transform data to polygons
  let buffer1 = buffer(layer1.data, 0.1, { units: "meters" });
  let buffer2 = buffer(layer2.data, 0.1, { units: "meters" });

  resultData.features = layerIntersection(buffer1.features, buffer2.features);

  if (resultData.features.length === 0) {
    return null;
  } else {
    resultLayer.data = resultData;
    return resultLayer;
  }
}
/**
 * Since Turfs intersection method does not always work as expected,
 * we instead perform two difference operations to get same result
 */
function layerIntersection(features1, features2) {
  const features3 = layerDifference(features2, features1);
  return layerDifference(features2, features3);
  /**
   * For each feature in both layers, checks the overlapping area and
   * adds it to a new layer.
   * Not used, as Turfs intersection method does not give the correct overlapping area
   */
  /*
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
  */
}
