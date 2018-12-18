import React, { Component } from "react";
import { InputTypes } from "../util/constants";
import "../css/processing.css";
import "../css/sidebar.css";
import deleteIcon from "../../images/icondelete.svg";

/**
 * The ways property values can be compared when selecting data from layerfiles.
 */
export const ComparisonMethods = {
  equal: "is Equal to",
  notEqual: "is not Equal to",
  greater: "is Greater than",
  less: "is Less than",
  greaterEqual: "is Greater or Equal to",
  lessEqual: "is Less or Equal to"
};
/**
 * The datatypes in the three drop down menus
 */
export const AttributeType = {
  property: "property",
  operator: "operator",
  value: "value"
};
/**
 * Class for selecting specific attributes from a layer and creating a new layer from them
 */
class AttributeSelector extends Component {
  /**
   * Datatypes:
   * @param {Array} filters: Array of objects. Objects contain: property, operator, comparison value
   * @param {Object} properties: Object with arrays. Keys are properties, values are array of property values
   * @param {Map} datatypes: Map over the datatype each property contains
   */
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      properties: {},
      dataTypes: new Map(),
      processing: false,
      name: ""
    };
  }
  /**
   * Analyse values in the inputlayer, create an initial selectField
   */
  componentDidMount() {
    this.loadAttributes();
    this.addSelectField();
  }
  /**
   * Go through each feature in the layer data, find all property types
   * and add the property type and its possible values to a list.
   */
  loadAttributes = () => {
    const layer = this.props.layers[0];
    const properties = {};
    for (let featureID in layer.data.features) {
      const feature = layer.data.features[featureID];
      for (let property in feature.properties) {
        const newValue = feature.properties[property];
        //Check if 'property' has been added before
        if (property in properties) {
          //Check if the new value has not been added before
          if (properties[property].indexOf(newValue) === -1) {
            properties[property].push(newValue);
          }
        }
        //Initialize a list containing the possible values for 'property'
        else {
          properties[property] = [newValue];
          this.setDataType(property, newValue);
        }
      }
    }
    this.setState({ properties: properties });
  };
  /**
   * Set the datatype for each property. Can be string or number.
   * Is used to determine which operators the user can use, ie: <, > may only be used on numbers
   * @param {} property Property field from layer. Ex: "road type", "water depth".
   * @param {} value Corresponding value of the property field. Ex: "highway", "15".
   */
  setDataType = (property, value) => {
    let type = null;
    if (!isNaN(value)) {
      type = InputTypes.number;
    } else {
      type = InputTypes.string;
    }
    this.setState(prevState => {
      return { dataTypes: prevState.dataTypes.set(property, type) };
    });
  };
  /**
   * Goes through the filters the user has chosen and creates a new layer based on them.
   * If the user has entered a name, it is added to the new layer
   */
  onExecute = () => {
    const layer = this.props.layers[0];
    const data = Object.assign({}, layer.data);
    data.features = [];
    for (let featureID in layer.data.features) {
      const feature = layer.data.features[featureID];
      if (this.checkFilters(feature.properties)) {
        data.features.push(feature);
      }
    }
    let newName = this.state.name;
    newName = newName.length > 0 ? newName : "sp-" + layer.name;
    const extractedLayer = { name: newName, data: data };
    this.props.onExecute(extractedLayer);
  };
  /**
   * Check if the feature fulfills all selection criteria
   */
  checkFilters = properties => {
    let fulfill = true;
    for (let filterID in this.state.filters) {
      const filter = this.state.filters[filterID];
      if (!this.fulfillCriteria(filter, properties[filter.property])) {
        fulfill = false;
      }
    }
    return fulfill;
  };
  /**
   * Compares the filter value to the inputvalue using the comparison method.
   */
  fulfillCriteria = (filter, value) => {
    switch (filter.operator) {
      case ComparisonMethods.equal:
        return value === filter.value;
      case ComparisonMethods.notEqual:
        return value !== filter.value;
      case ComparisonMethods.greater:
        return value > filter.value;
      case ComparisonMethods.less:
        return value < filter.value;
      case ComparisonMethods.greaterEqual:
        return value >= filter.value;
      case ComparisonMethods.lessEqual:
        return value <= filter.value;
      default:
        return false;
    }
  };
  /**
   * Cancels the attribute selection without applying any filters
   */
  onCancel = () => {
    this.props.onClose();
  };
  /**
   * Add a new base selectfield to filters. Uses the first available property and its
   * first legal operator and value
   */
  addSelectField = () => {
    this.setState(prevState => {
      const filters = prevState.filters;
      const firstProperty = Object.keys(prevState.properties)[0];
      const filter = this.getFilterForProperty(firstProperty, prevState);
      filters.push(filter);
      return { filters: filters };
    });
  };
  /**
   * Returns a valid filter for a specific property, with
   * the first operator and value as its default values
   */
  getFilterForProperty = (property, prevState) => {
    const filter = {
      property: property,
      operator: this.getLegalComparators(prevState.dataTypes.get(property))[0],
      value: prevState.properties[property][0]
    };
    return filter;
  };
  /**
   * Returns the comparators that can be used on a specific datatype.
   * Strings can only have equals (=) and not equals (!=).
   * Numbers can have all comparison methods
   */
  getLegalComparators = dataType => {
    switch (dataType) {
      case InputTypes.string:
        return [ComparisonMethods.equal, ComparisonMethods.notEqual];
      case InputTypes.number:
        return Object.values(ComparisonMethods);
      default:
        return null;
    }
  };
  /**
   * User deletes specific filter
   */
  deleteSelection = pos => {
    this.setState(prevState => {
      const filters = prevState.filters;
      filters.splice(pos, 1);
      return { filters: filters };
    });
  };

  /**
   * Handles user input to a filter. Updates a filter object with the new
   * value, according to which AttributeType is is
   */
  handleSelectionUpdate = (event, pos, type) => {
    const newValue = event.target.value;
    this.setState(prevState => {
      const filters = prevState.filters;
      let filter = filters[pos];
      switch (type) {
        //Need to update the property and its possible values
        case AttributeType.property:
          filter = this.getFilterForProperty(newValue, prevState);
          break;
        case AttributeType.operator:
          filter.operator = newValue;
          break;
        case AttributeType.value:
          filter.value = newValue;
          break;
        default:
      }
      filters.splice(pos, 1, filter);
      return { filters: filters };
    });
  };

  /**
   * Creates 3 drop down menus for filtering data from a layer.
   * Menu for Attribute Property, Operator and Value,
   * plus button for deleting the filter
   */
  createSelectFields = () => {
    const selectFields = [];
    const properties = Object.keys(this.state.properties);
    this.state.filters.forEach((filter, position) => {
      const comparators = this.getLegalComparators(
        this.state.dataTypes.get(filter.property)
      );
      const values = this.state.properties[filter.property];
      selectFields.push(
        <div key={position}>
          {this.createSelectField(
            properties,
            filter.property,
            AttributeType.property,
            position
          )}
          {this.createSelectField(
            comparators,
            filter.operator,
            AttributeType.operator,
            position
          )}
          {this.createSelectField(
            values,
            filter.value,
            AttributeType.value,
            position
          )}
          <img
            src={deleteIcon}
            alt=""
            onClick={() => this.deleteSelection(position)}
          />
        </div>
      );
    });
    return selectFields;
  };
  /**
   * Creates drop down menu with options from 'valueChoices'
   */
  createSelectField = (valueChoices, defaultChoice, type, pos) => {
    return (
      <select
        key={type}
        value={defaultChoice}
        onChange={event => this.handleSelectionUpdate(event, pos, type)}
      >
        {valueChoices.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    );
  };
  handleNameChange = event => {
    const name = event.target.value;
    this.setState({ name: name });
  };

  /**
   * Render function
   * Contains field for giving a name to the new layer
   * Fields for filtering layer data
   * Button for adding new filters
   * Cancel button and start button
   */
  render() {
    return (
      <div>
        <span>Name of new layer: </span>
        <input
          type={"text"}
          value={this.state.name}
          onChange={event => this.handleNameChange(event)}
        />
        <span>
          <br />
          Filters:
        </span>
        {this.createSelectFields()}
        <button onClick={this.addSelectField} disabled={this.state.processing}>
          Add filter
        </button>
        <button onClick={this.onCancel} disabled={this.state.processing}>
          Cancel
        </button>
        <button
          onClick={this.onExecute}
          disabled={this.state.processing || this.state.filters.length === 0}
        >
          Start
        </button>
      </div>
    );
  }
}

export default AttributeSelector;
