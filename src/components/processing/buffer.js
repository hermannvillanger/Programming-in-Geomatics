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
  //const shouldDissolve = inputs[1];
  const name = layer.name + "-buffer-" + bufferValue;
  try {
    let bufferLayer = buffer(layer.data, bufferValue, {
      units: "meters"
    });
    //if (shouldDissolve) {
    //  bufferLayer = dissolve(bufferLayer, { type: "Feature" });
    //}
    resultLayer = { name: name, data: bufferLayer };
  } catch (error) {
    console.log("Error in buffer: ");
    console.log(error);
    resultLayer = null;
  } finally {
    return resultLayer;
  }
  //TODO: Add dissolve
}
