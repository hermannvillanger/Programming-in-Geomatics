import React, { Component } from "react";
import "./css/sidebar.css";
import { validateNumberInput } from "./util/support.js";
const InputValues = {
  name: "Name: ",
  color: "Color: ",
  opacity: "Opacity: "
};
/**
 * Class for the popup menu which allows changing properties of a layer
 */
class Properties extends Component {
  constructor(props) {
    super(props);
    //Map input type to inputvalue
    const inputs = new Map([
      [InputValues.name, props.layer.name],
      [InputValues.color, props.style.color],
      [InputValues.opacity, props.style.opacity]
    ]);
    this.state = {
      inputs: inputs
    };
  }
  /**
   * How textinput should be handled. Can check if the input is valid, nonempty...
   */
  handleTextInput = (evt, inputName, defaultValue) => {
    let newValue = evt.target.value;
    this.setState(prevState => {
      return { inputs: prevState.inputs.set(inputName, newValue) };
    });
  };
  /**
   * Handle numerical input with min and max value.
   * Remove all non-numerical values from input, check if remainder is not empty.
   * If not empty, compare to min and max, if empty set as empty string
   */
  handleRangeInput = (evt, inputName, defaultValue, min, max) => {
    let newValue = validateNumberInput(evt.target.value, defaultValue);
    newValue =
      String(newValue).length > 0
        ? this.ValidateRangeInput(newValue / 100, defaultValue, min, max)
        : "";
    this.setState(prevState => {
      return { inputs: prevState.inputs.set(inputName, newValue) };
    });
  };
  /**
   * Checks if inputValue is within the constraints. If not, returns max or min values
   */
  ValidateRangeInput = (inputValue, defaultValue, min, max) => {
    if (Number(inputValue) < min) {
      inputValue = min;
    } else if (Number(inputValue) > max) {
      inputValue = max;
    }
    return inputValue;
  };
  /**
   * Calls App with changes to properties the user have entered.
   * Validation is done in App component, we send null if the field should not be changes
   */
  applyChanges = () => {
    this.props.onNameChange(
      this.props.layer,
      this.state.inputs.get(InputValues.name)
    );
    const color = this.state.inputs.get(InputValues.color);
    const opacity = this.state.inputs.get(InputValues.opacity);
    this.props.onStyleChange(this.props.layer.id, {
      color: color.length > 0 ? color : null,
      opacity: String(opacity).length > 0 ? opacity : null
    });
    this.removeDialogue();
  };
  /**
   * Call parent to close properties popup
   */
  removeDialogue = () => {
    this.props.onDialogueFinished();
  };
  /**
   * Create the content of properties menu.
   * Contains each property and a field for changing them in a vertial list
   */
  createPage = () => {
    return (
      <React.Fragment>
        {this.textInput(
          InputValues.name,
          this.state.inputs.get(InputValues.name),
          this.handleTextInput
        )}
        {this.colorInput(
          InputValues.color,
          this.state.inputs.get(InputValues.color),
          this.handleTextInput
        )}
        {this.rangeInput(
          InputValues.opacity,
          String(this.state.inputs.get(InputValues.opacity)).length > 0
            ? this.state.inputs.get(InputValues.opacity) * 100
            : "",
          0,
          1,
          this.handleRangeInput
        )}
        <button onClick={this.removeDialogue}>Cancel</button>
        <button onClick={this.applyChanges}>Apply</button>
      </React.Fragment>
    );
  };
  textInput = (inputName, defaultValue, onEdit) => {
    return (
      <div>
        {inputName}
        <input
          type="text"
          value={defaultValue}
          onChange={evt => onEdit(evt, inputName, defaultValue)}
        />
      </div>
    );
  };
  rangeInput = (inputName, defaultValue, min, max, onEdit) => {
    return (
      <div>
        {inputName}
        <input
          type="text"
          style={{ width: "50px" }}
          value={defaultValue}
          onChange={evt => onEdit(evt, inputName, defaultValue, min, max)}
        />
        {"%"}
      </div>
    );
  };
  colorInput = (inputName, defaultValue, onEdit) => {
    return (
      <div>
        {inputName}
        <input
          type="color"
          value={defaultValue}
          onChange={evt => onEdit(evt, inputName, defaultValue)}
        />
      </div>
    );
  };
  render() {
    return (
      <div className="properties-menu">
        {"Layer properties"}
        {this.createPage()}
      </div>
    );
  }
}

export default Properties;
