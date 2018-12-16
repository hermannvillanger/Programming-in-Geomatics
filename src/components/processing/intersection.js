import { intersect, buffer } from "@turf/turf";
/**
 * Takes two layers and returns a new layer containing the intersection between them
 * @param {Array} layers Array of layers. Contains 2 layers in this operation
 * @param {Array|Null} inputs Array of inputs. Null in this operation
 */
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
  /**
   * For each feature in both layers, checks the overlapping area and
   * adds is to a new layer
   */
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
