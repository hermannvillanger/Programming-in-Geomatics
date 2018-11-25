import { InputTypes } from "../util/constants.js";
import { bufferScript } from "./buffer.js";
import { intersectionScript } from "./intersection.js";
import { unionScript } from "./union.js";
import { differenceScript } from "./difference";

import bufferImg from "../../images/buffer.png";
import intersectionImg from "../../images/intersection.png";
import unionImg from "../../images/union.png";
import differenceImg from "../../images/difference.png";

import AttributeSelector from "./attributeselector";

/**
 * Array of processing operators that do not need extra user input
 * Format:
 * name: must be unique
 * inputLayers: how many layers is operates on
 * inputValues: null if no extra input, or an array or objects describing the input
 * script: which function will be executed
 * info: descriptive image of the operation. An image link or null
 */
export const operations = [
  {
    name: "Buffer",
    inputLayers: 1,
    inputValues: [
      createInputValue("Buffer value", 100, InputTypes.number),
      createInputValue("Dissolve(very slow)", true, InputTypes.boolean)
    ],
    script: bufferScript,
    info: bufferImg
  },
  {
    name: "Difference",
    inputLayers: 2,
    inputValues: null,
    script: differenceScript,
    info: differenceImg
  },
  {
    name: "Intersection",
    inputLayers: 2,
    inputValues: null,
    script: intersectionScript,
    info: intersectionImg
  },
  {
    name: "Union(very slow)",
    inputLayers: 2,
    inputValues: null,
    script: unionScript,
    info: unionImg
  }
];
function createInputValue(inputName, defaultInput, inputType) {
  return {
    inputName: inputName,
    defaultInput: defaultInput,
    inputType: inputType
  };
}

/**
 * Operations needing additional user interaction, like feature extractors.
 * Must have a component describing the popupwindow
 */
export const componentOperations = [
  {
    name: "Select properties",
    inputLayers: 1,
    inputValues: null,
    info: null,
    popupComponent: AttributeSelector
  }
];
