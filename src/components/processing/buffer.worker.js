/**
 * Proof of consept file for async buffer worker
 * Not used until we find a way to use imported functions
 * (like buffer from turf) in react with web workers
 */
/**
 * Create list of inputs to buffer. Use with <bufferfunction>.apply(...) in main function
 * @param {*} layers
 * @param {*} inputs
 */
import { buffer } from "@turf/turf";

export function bufferInput(layers, inputs) {
  const layer = layers[0];
  const bufferValue = inputs[0];
  const unitType = { units: "meters" };
  return [layer, bufferValue, unitType];
}

export const bufferScript = () => {
  //const buffer = require("@turf/buffer");
  let onmessage = e => {
    //importScripts("@turf/buffer");
    let resultLayer = null;
    const layers = e.data[0];
    const inputValues = e.data[1];
    const layer = layers[0];
    const bufferValue = inputValues[0];
    const dissolve = inputValues[1];
    const name = layer.name + "-buffer-" + bufferValue;
    try {
      const bufferLayer = buffer(layer.data, bufferValue, {
        units: "meters"
      });
      resultLayer = { name: name, data: bufferLayer };
    } catch (error) {
      console.log("Error in buffer: ");
      console.log(error);
      resultLayer = null;
    } finally {
      postMessage(resultLayer);
    }
  };
};
/**
 * For processing script to something the web worker can use as input
 */
function processingURL(workerScript) {
  let code = workerScript.toString();
  code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
  const blob = new Blob([code], { type: "application/javascript" });
  return URL.createObjectURL(blob);
}
