import { InputTypes } from "../util/constants.js";
import { bufferScript } from "./buffer.js";
import { intersectionScript } from "./intersection.js";
import { unionScript } from "./union.js";
import { differenceScript } from "./difference";
import bufferImg from "../../images/buffer.png";
import intersectionImg from "../../images/intersection.png";
import unionImg from "../../images/union.png";
import differenceImg from "../../images/difference.png";

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
    info: bufferImg
  },
  {
    name: "Intersection",
    inputLayers: 2,
    inputValues: null,
    script: intersectionScript,
    info: intersectionImg
  },
  {
    name: "Union",
    inputLayers: 2,
    inputValues: null,
    script: unionScript,
    info: unionImg
  },
  {
    name: "Difference",
    inputLayers: 2,
    inputValues: null,
    script: differenceScript,
    info: differenceImg
  }
];

function createInputValue(inputName, defaultInput, inputType) {
  return {
    inputName: inputName,
    defaultInput: defaultInput,
    inputType: inputType
  };
}
