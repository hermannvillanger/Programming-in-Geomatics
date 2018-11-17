import { InputTypes } from "../util/constants.js";
import { bufferScript } from "./buffer.js";
import { intersectionScript } from "./intersection.js";
import { unionScript } from "./union.js";
import { differenceScript } from "./difference";
//import Image1 from '../../images/image1'

/**
 * Array of all processing types
 * Format:
 * name: must be unique
 * inputLayers: how many layers is operates on
 * inputValues: if it need additional input(like buffer value)
 * script: which script in this folder will be executed
 */
export const operations = [
  {
    name: "Buffer",
    inputLayers: 1,
    inputValues: [
      createInputValue("Buffer value", 100, InputTypes.number)
      //createInputValue("Dissolve", true, InputTypes.boolean)
    ],
    script: bufferScript,
    info: null //TODO: Image visualizing the operation
  },
  {
    name: "Intersection",
    inputLayers: 2,
    inputValues: null,
    script: intersectionScript,
    info: null
  },
  {
    name: "Union",
    inputLayers: 2,
    inputValues: null,
    script: unionScript,
    info: null
  },
  {
    name: "Difference",
    inputLayers: 2,
    inputValues: null,
    script: differenceScript,
    info: null
  }
];

function createInputValue(inputName, defaultInput, inputType) {
  return {
    inputName: inputName,
    defaultInput: defaultInput,
    inputType: inputType
  };
}
