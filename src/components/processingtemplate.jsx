import React, { Component } from "react";
import ProcessingField from "./processingfield";
import PropTypes from "prop-types";
import { OperationShape, LayerShape, InputTypes } from "./util/constants";
import "./css/sidebar.css";
import "./css/popup.css";
import { validateNumberInput } from "./util/support.js";
import infoIcon from "../images/iconinfo.svg";
import Popup from "reactjs-popup";

/**
 * Base class for operations in the sidebar. Creates inputfields
 * and initiates the processing operation on the input layers
 */
class ProcessingTemplate extends Component {
  /**
   * Populates the template with default values for user input, if required,
   * and array for inputlayers
   */
  constructor(props) {
    super(props);
    const defaultInputs = this.getDefaultValues(props.operation.inputValues);
    this.state = {
      layers: new Array(props.operation.inputLayers).fill(null),
      inputs: defaultInputs,
      processing: false
    };
  }
  /**
   * Returns array of all default inputvalues for the inputfields, or null if no inputvalues
   */
  getDefaultValues = inputValues => {
    let defaultInputs = null;
    if (inputValues) {
      defaultInputs = [];
      inputValues.forEach(inputValue => {
        defaultInputs.push(
          inputValue.defaultInput !== null ? inputValue.defaultInput : ""
        );
      });
    }
    return defaultInputs;
  };
  /**
   * If the operation requires input in addition to the layers, create corresponding
   * fields for user input here
   */
  createInputFields = () => {
    const { inputValues } = this.props.operation;
    let inputFields = null;
    if (inputValues) {
      inputFields = [];
      inputValues.forEach((inputValue, index) => {
        inputFields.push(this.createInputField(inputValue, index));
      });
    }
    return inputFields;
  };
  /**
   * Create a single inputfield, either a checkbox or an inputfield
   */
  createInputField = (inputValue, index) => {
    if (inputValue.inputType === InputTypes.boolean) {
      return (
        <div key={index}>
          {inputValue.inputName}
          <input
            type={"checkbox"}
            checked={this.state.inputs[index]}
            onChange={() =>
              this.setState(prevState => {
                const inputs = prevState.inputs;
                inputs.splice(index, 1, !inputs[index]);
                return { inputs: inputs };
              })
            }
          />
        </div>
      );
    } else {
      return (
        <div key={index}>
          {inputValue.inputName}
          <input
            type={"text"}
            value={this.state.inputs[index]}
            onChange={event => this.handleInputValue(event, index, inputValue)}
          />
        </div>
      );
    }
  };
  /**
   * Validates if the user input is non-empty and of correct type.
   * If not, replaces value with the default value, or an empty string if no default
   */
  handleInputValue = (event, index, inputValue) => {
    const value = event.target.value;
    this.setState(prevState => {
      let newValue;
      switch (inputValue.inputType) {
        case InputTypes.number:
          newValue = validateNumberInput(value, inputValue.defaultInput);
          break;
        case InputTypes.string:
          newValue = String(value).length > 0 ? value : inputValue.defaultInput;
          break;
        default:
          newValue = inputValue.defaultInput;
      }
      const inputs = prevState.inputs;
      inputs.splice(index, 1, newValue);
      return { inputs: inputs };
    });
  };

  /**
   * Creates drag-drop fields for layers, by amount specified in operation
   */
  createLayerFields = () => {
    const inputFields = [];
    for (let i = 0; i < this.props.operation.inputLayers; i++) {
      inputFields.push(
        <ProcessingField
          key={i}
          index={i}
          inputLayers={this.props.operation.inputLayers}
          layer={this.state.layers[i]}
          onSwap={this.handleSwap}
          onDrop={this.handleDrop}
        />
      );
    }
    return inputFields;
  };
  /**
   * Handles dropping of a layer. If it already exists, move the layer to the new position,
   * and swap places if a layer is already there.
   * If new layer, replace the layer currently on that index
   * @param {Object} layer The dropped layer
   * @param {Number} index The new index of the layer
   */
  handleDrop = (layer, index) => {
    this.setState(prevState => {
      const position = this.checkLayers(layer.id, prevState.layers);
      let layers;
      if (position > -1) {
        layers = this.handleSwap(position, index, prevState.layers);
      } else {
        layers = prevState.layers;
        layers.splice(index, 1, layer);
      }
      return { layers: layers };
    });
  };
  /**
   * If layer with id already exists, return index of the layer
   */
  checkLayers = (id, layers) => {
    return layers.indexOf(
      layers.find(layer => layer !== null && layer.id === id)
    );
  };
  /**
   * Swaps positions of two layers
   */
  handleSwap = (currentIndex, nextIndex, layers) => {
    const layer = layers[currentIndex];
    layers.splice(currentIndex, 1, layers[nextIndex]);
    layers.splice(nextIndex, 1, layer);
    return layers;
  };

  /**
   * Resets state to default values. Empty for layers, default values for inputs
   */
  handleReset = () => {
    this.setState(() => {
      const defaultInputs = this.getDefaultValues(
        this.props.operation.inputValues
      );
      return {
        layers: new Array(this.props.operation.inputLayers).fill(null),
        inputs: defaultInputs,
        processing: false
      };
    });
  };
  /**
   * Checks if processing can start.
   * Can start if not already processing, if no layer fields are empty,
   * and if all inputs are valid
   */
  processingStart = () => {
    const { layers, inputs } = this.state;
    const { operation } = this.props;
    if (layers.find(layer => layer === null) === undefined) {
      let canProcess = true;
      if (operation.inputValues) {
        operation.inputValues.forEach((inputValue, index) => {
          //Input must be non-null, non-empty, and of correct type
          if (
            inputs[index] === null ||
            String(inputs[index]).length === 0 ||
            typeof inputs[index] !== inputValue.inputType
          ) {
            canProcess = false;
          }
        });
      }
      if (canProcess) {
        this.props.popup
          ? this.openPopup(layers, inputs)
          : this.startProcessing(layers, inputs);
      }
    }
  };
  /**
   * Starts processing without popup
   */
  startProcessing = (layers, inputs) => {
    this.setState({
      processing: true
    });
    const layer = this.props.operation.script(layers, inputs);
    this.processFinished(layer);
  };
  /**
   * Opens the popup processing window
   */
  openPopup = () => {
    this.setState({
      processing: true
    });
  };
  /**
   * Callback for when processing is done. Adds the layer to the map,
   * and resets all inputs for the operation
   */
  processFinished = layer => {
    if (layer !== null) {
      this.props.onProcessingDone(layer);
    } else {
      alert("The processed area is empty");
    }
    this.handleReset();
  };
  closePopup = () => {
    this.setState({ processing: false });
  };

  /**
   * Render function
   * The popup is only created if this type of operation needs a seperate window
   * Creates layer and inputfields based on operation specifications
   * Creates reset button and start button for processing. Start button is greyed out if
   * a process is ongoing.
   */
  render() {
    const { listOpen, popup } = this.props;
    const PopupComponent = popup ? this.props.operation.popupComponent : "div";
    return (
      <div className="template">
        <Popup
          open={popup && this.state.processing}
          modal
          onClose={this.closePopup}
        >
          <PopupComponent
            layers={this.state.layers}
            inputs={this.state.inputs}
            onExecute={this.processFinished}
            onClose={this.closePopup}
          />
        </Popup>
        <div onClick={() => this.props.onToggle(this.props.operation.name)}>
          {this.props.operation.name}
          {this.props.operation.info && (
            <Popup
              trigger={<img src={infoIcon} className="info-icon" alt="" />}
              position="right top"
              on="hover"
            >
              <img
                style={{ width: "300px" }}
                src={this.props.operation.info}
                alt=""
              />
            </Popup>
          )}
        </div>
        {listOpen && (
          <div>
            {this.createLayerFields()}
            {this.createInputFields()}
            <button
              onClick={() => this.handleReset()}
              disabled={this.state.processing}
            >
              Reset
            </button>
            <button
              onClick={() => this.processingStart()}
              disabled={this.state.processing}
            >
              Start
            </button>
          </div>
        )}
      </div>
    );
  }
}

ProcessingTemplate.propTypes = {
  operation: PropTypes.shape(OperationShape).isRequired,
  layer: PropTypes.shape(LayerShape),
  onProcessingDone: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  processing: PropTypes.bool
};

export default ProcessingTemplate;
