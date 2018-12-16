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
/**
 * Targets and sources for drag and drop functionality.
 * Use these keywords when making draggable layer,
 * a droppable field for layers in an operation etc...
 */
export const ItemTypes = {
  LAYER: "layer",
  OPERATION: "operation"
};
/**
 * Proptypes template for layers
 */
export const LayerShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
};
/**
 * Proptypes template for operations
 */
export const OperationShape = {
  name: PropTypes.string.isRequired,
  inputLayers: PropTypes.number.isRequired
};
/**
 * Object of string containing all valid inputtypes of user data
 */
export const InputTypes = {
  number: "number",
  boolean: "boolean",
  string: "string"
};
