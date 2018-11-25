import React, { Component } from "react";
import { InputTypes } from "../util/constants";
import "../css/processing.css";
import "../css/sidebar.css";
import deleteIcon from "../../images/icondelete.svg";

const ComparisonMethods = {
  equal: "equal to",
  notEqual: "not equal to",
  greater: "greater than",
  less: "less than",
  greaterEqual: "greater or equal to",
  lessEqual: "less or equal to"
};
const AttributeType = {
  property: "property",
  operator: "operator",
  value: "value"
};

class AttributeSelector extends Component {
  /**
   * Datatypes:
   * Selectors: array of objects. Objects contain: property, operator, comparison value
   * Properties: object with arrays. Keys are properties, values are array of property values
   * Datatypes: which datatype each property contains
   */
  constructor(props) {
    super(props);
    this.state = {
      selectors: [],
      properties: {},
      dataTypes: new Map(),
      processing: false
    };
  }
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
  onExecute = () => {
    const layer = this.props.layers[0];
    const data = Object.assign({}, layer.data);
    data.features = [];
    for (let featureID in layer.data.features) {
      const feature = layer.data.features[featureID];
      if (this.checkSelectors(feature.properties)) {
        data.features.push(feature);
      }
    }
    const newName = layer.name + "-select";
    const extractedLayer = { name: newName, data: data };
    this.props.onExecute(extractedLayer);
  };
  /**
   * Check if the feature fulfills all selection criteria
   */
  checkSelectors = properties => {
    let fulfill = true;
    for (let selectorID in this.state.selectors) {
      const selector = this.state.selectors[selectorID];
      if (!this.fulfillCriteria(selector, properties[selector.property])) {
        fulfill = false;
      }
    }
    return fulfill;
  };
  /**
   * Compares the selector value to the inputvalue using the comparison method.
   * Note: we are comparing 'value' to 'selector.value'
   */
  fulfillCriteria = (selector, value) => {
    switch (selector.operator) {
      case ComparisonMethods.equal:
        return value === selector.value;
      case ComparisonMethods.notEqual:
        return value !== selector.value;
      case ComparisonMethods.greater:
        return value > selector.value;
      case ComparisonMethods.less:
        return value < selector.value;
      case ComparisonMethods.greaterEqual:
        return value >= selector.value;
      case ComparisonMethods.lessEqual:
        return value <= selector.value;
      default:
        return false;
    }
  };

  onCancel = () => {
    this.props.onClose();
  };
  /**
   * Add a new base selectfield to selectors
   */
  addSelectField = () => {
    this.setState(prevState => {
      const selectors = prevState.selectors;
      const firstProperty = Object.keys(prevState.properties)[0];
      const selector = this.getSelectorForProperty(firstProperty, prevState);
      selectors.push(selector);
      return { selectors: selectors };
    });
  };
  /**
   * Returns a valid selector for a specific property, with
   * the first operator and value as its default values
   */
  getSelectorForProperty = (property, prevState) => {
    const selector = {
      property: property,
      operator: this.getLegalComparators(prevState.dataTypes.get(property))[0],
      value: prevState.properties[property][0]
    };
    return selector;
  };
  /**
   * Returns the comparators that can be used on a specific datatype.
   * Strings can only have equals and not equals
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
   * User deletes specific selector
   */
  deleteSelection = pos => {
    this.setState(prevState => {
      const selectors = prevState.selectors;
      selectors.splice(pos, 1);
      return { selectors: selectors };
    });
  };

  /**
   * Handles user input to a selector. Updates a selector object with the new
   * value, according to the type
   */
  handleSelectionUpdate = (event, pos, type) => {
    const newValue = event.target.value;
    this.setState(prevState => {
      const selectors = prevState.selectors;
      let selector = selectors[pos];
      switch (type) {
        //Need to update the property and its possible values
        case AttributeType.property:
          selector = this.getSelectorForProperty(newValue, prevState);
          break;
        case AttributeType.operator:
          selector.operator = newValue;
          break;
        case AttributeType.value:
          selector.value = newValue;
          break;
        default:
      }
      selectors.splice(pos, 1, selector);
      return { selectors: selectors };
    });
  };

  /**
   * For selecting data from a layer.
   * TODO: Add input field for new name
   */
  createSelectFields = () => {
    const selectFields = [];
    const properties = Object.keys(this.state.properties);
    this.state.selectors.forEach((selector, position) => {
      const comparators = this.getLegalComparators(
        this.state.dataTypes.get(selector.property)
      );
      const values = this.state.properties[selector.property];
      selectFields.push(
        <div key={position}>
          {this.createSelectField(
            properties,
            selector.property,
            AttributeType.property,
            position
          )}
          {this.createSelectField(
            comparators,
            selector.operator,
            AttributeType.operator,
            position
          )}
          {this.createSelectField(
            values,
            selector.value,
            AttributeType.value,
            position
          )}
          <img
            src={deleteIcon}
            alt=""
            onClick={() => this.deleteSelection(position)}
          />
          {/*TODO: Add image with + sign, for adding selections*/}
        </div>
      );
    });
    return selectFields;
  };
  /**
   * Creates drop down menu with options from 'valueChoices
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

  render() {
    return (
      <div>
        {this.createSelectFields()}
        <button onClick={this.addSelectField} disabled={this.state.processing}>
          Add selection
        </button>
        <button onClick={this.onCancel} disabled={this.state.processing}>
          Cancel
        </button>
        <button onClick={this.onExecute} disabled={this.state.processing}>
          Start
        </button>
      </div>
    );
  }
}

export default AttributeSelector;
