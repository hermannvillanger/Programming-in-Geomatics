import PropTypes from "prop-types";
/**
 * Class for global constants
 */
export const ACCEPTED_FILE_TYPES =
  ".geojson, .gml, .dbf, .prj, .sbn, .sbx, .shp, .shx, .shp.xml";
export const SHAPE_FORMATS = [
  ".shp",
  ".dbf",
  ".prj",
  ".sbn",
  ".sbx",
  ".shx",
  ".shp.xml"
];
export const ItemTypes = {
  LAYER: "layer",
  OPERATION: "operation"
};

export const LayerShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
};
/*
const InputValuesShape = {
  inputName: PropTypes.string.isRequired,
  defaultInput: PropTypes.any,
  inputType: PropTypes.string
};
*/
export const OperationShape = {
  name: PropTypes.string.isRequired,
  inputLayers: PropTypes.number.isRequired
  //inputValues: PropTypes.arrayOf(PropTypes.shape(InputValuesShape)),
  //script: PropTypes.string.isRequired
};

export const InputTypes = {
  number: "number",
  boolean: "boolean",
  string: "string"
};
export const Actions = {
  delete: "delete",
  zoom: "zoom",
  properties: "properties"
};
