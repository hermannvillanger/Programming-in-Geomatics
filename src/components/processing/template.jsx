/**
 * Created by Hermann
 * Base class which the operations extend
 */
import React, { Component } from "react";
import ProcessingField from "./processingfield";
import PropTypes from "prop-types";
import { OperationShape, LayerShape, InputTypes } from "../util/constants";
import "../css/sidebar.css";
import { validateNumberInput } from "../util/support.js";
import infoIcon from "../../images/iconinfo.svg";
/**
 * General setup:
 * Number of layers to take in
 * Operation to be used
 * Button for executing operation, send ids of layers to executor
 * Button for switching layers/drag and switch places
 * Button for emptying selection, only after finished
 * Expand drop down menu when clicked on, reveals everything
 */

class ProcessingTemplate extends Component {
  /**
   * Populates the template with default values for user input, if required
   * @param {*} props
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
            onChange={evt => this.handleInputValue(evt, index, inputValue)}
          />
        </div>
      );
    }
  };
  /**
   * Validates if the user input is non-empty and of correct type.
   * If not, replaces value with the default value, or an empty string if no default
   */
  handleInputValue = (evt, index, inputValue) => {
    const value = evt.target.value;
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
    let inputFields = [];
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
   * If layer id already exists, return index of the layer
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
   * Resets state to default values. Empty for layers, default values for
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
   * Removes a specific layer. May be unneeded
   */
  resetField = index => {
    this.setState(prevState => {
      let layers = prevState.layers;
      layers.splice(index, 1, null);
      return { layers: layers };
    });
  };
  /**
   * Starts processing if not already processing, and if all inputs are valid
   */
  processingStart = () => {
    const { layers, processing, inputs } = this.state;
    const { operation } = this.props;
    if (!processing) {
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
              //TODO: Should show that inputs are not correct
            }
          });
        }
        if (canProcess) {
          this.startWorker(layers, inputs);
        }
      }
    }
  };
  /**
   * Should start async process for turf operations, then add layer to map
   * Creates new webworker to perform processing. Script to be run is specified in 'operationtypes.js'
   */
  startWorker = (layers, inputs) => {
    this.setState({
      processing: true
    });
    const layer = this.props.operation.script(layers, inputs);
    this.workerFinished(layer);
  };
  /**
   * Callback for when processing is done. Calls App, which decides next action
   */
  workerFinished = layer => {
    this.setState({ processing: false });
    //TODO: Show error if null
    if (layer !== null) {
      this.handleReset();
      this.props.onProcessingDone(layer);
    }
  };
  /**
   * Creates layer and inputfields based on operation specifications
   * Creates reset button and start button for processing. Start button is greyed out if
   * a process is ongoing
   */
  render() {
    const { listOpen } = this.props;
    return (
      <div className="template">
        <div onClick={() => this.props.onToggle(this.props.operation.name)}>
          {this.props.operation.name}
          <img
            src={infoIcon}
            className="info-icon"
            alt="" /*onMouseOver={/*Show image here*/
          />
          {/*TODO: Add info button with picture explaining this function*/}
        </div>
        {listOpen && (
          <div>
            {this.createLayerFields()}
            {this.createInputFields()}
            <button onClick={() => this.handleReset()}>Reset</button>
            <button
              onClick={() => this.processingStart()}
              style={{ opacity: this.state.processing ? 0.3 : 1 }}
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
