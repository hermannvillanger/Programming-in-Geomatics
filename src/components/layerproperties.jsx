import React, { Component } from "react";
import PropTypes from "prop-types";
import { InputTypes } from "./util/constants.js";
import "./css/sidebar.css";
import { validateNumberInput } from "./util/support.js";
/**
 * Popup menu for giving new name, new color and opacity, save layer?...
 * On top: page for name, color, ... extendable
 */
const InputValues = {
  name: "Name",
  color: "Color",
  opacity: "Opacity"
};

class Properties extends Component {
  constructor(props) {
    super(props);
    const inputs = new Map([
      [InputValues.name, props.layer.name],
      [InputValues.color, props.style.color],
      [InputValues.opacity, props.style.opacity]
    ]);
    this.state = {
      inputs: inputs
    };
  }
  handleTextInput = (evt, inputName, defaultValue) => {
    let newValue = evt.target.value;
    this.setState(prevState => {
      return { inputs: prevState.inputs.set(inputName, newValue) };
    });
  };
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
   * Checks if inputValue is within the constraints. If not, returns max and min values
   */
  ValidateRangeInput = (inputValue, defaultValue, min, max) => {
    if (Number(inputValue) < min) {
      inputValue = min;
    } else if (Number(inputValue) > max) {
      inputValue = max;
    }
    return inputValue;
  };
  applyChanges = () => {
    this.props.onNameChange(
      this.props.layer,
      this.state.inputs.get(InputValues.name)
    );
    const color = this.state.inputs.get(InputValues.color);
    const opacity = this.state.inputs.get(InputValues.opacity);
    this.props.onStyleChange(this.props.layer.id, {
      color: color.length > 0 ? color : null,
      opacity: opacity.length > 0 ? opacity : null
    });
    this.removeDialogue();
  };
  removeDialogue = () => {
    this.props.onDialogueFinished();
  };

  createPage = () => {
    return (
      <React.Fragment>
        {this.textInput(
          "Name",
          this.state.inputs.get(InputValues.name),
          this.handleTextInput
        )}
        {this.colorInput(
          "Color",
          this.state.inputs.get(InputValues.color),
          this.handleTextInput
        )}
        {this.rangeInput(
          "Opacity",
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
  rangeInput = (inputName, defaultValue, min, max, handleInput) => {
    return (
      <div>
        {inputName}
        <input
          type="text"
          style={{ width: "100px" }}
          value={defaultValue}
          onChange={evt => handleInput(evt, inputName, defaultValue, min, max)}
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
          onChange={evt => onEdit(evt, inputName)}
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
