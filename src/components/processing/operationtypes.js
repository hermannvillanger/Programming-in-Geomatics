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
 * Array of processing operators that do not need a special window for user input
 *
 * Format:
 * @param {String} name: Name of operation, must be unique
 * @param {Number} inputLayers: Inputlayers for the operation. Must be 1 or more
 * @param {Array|Null} inputValues: Which extra inputvalues the operation uses. Null if no extra input,
 * an array of objects describing the input is othervise
 * @param {Function} script: The js function which contains the operation
 * @param {Image|Null} info: A descriptive image of the operation. An image link or null if no image
 */
export const operations = [
  {
    name: "Buffer",
    inputLayers: 1,
    inputValues: [
      createInputValue("Buffer radius", 100, InputTypes.number),
      createInputValue("Dissolve(very slow)", false, InputTypes.boolean)
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
/**
 * Creates objects describing inputvalue fields.
 * @param {String} inputName Name of inputvalue
 * @param {InputTypes} defaultInput Default value used as inputvalue
 * @param {InputTypes} inputType Type of inputvalue
 */
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
 *
 * Format:
 * @param {String} name: Name of operation, must be unique
 * @param {Number} inputLayers: Inputlayers for the operation. Must be 1 or more
 * @param {Array|Null} inputValues: Which extra inputvalues the operation uses. Null if no extra input,
 * an array of objects describing the input is othervise
 * @param {Function} popupComponent: The jsx component describing the popup window for the operation
 * @param {Image|Null} info: A descriptive image of the operation. An image link or null if no image
 */
export const componentOperations = [
  {
    name: "Select properties",
    inputLayers: 1,
    inputValues: null,
    popupComponent: AttributeSelector,
    info: null
  }
];
