import React, { Component } from "react";
import "./css/sidebar.css";
import PropTypes from "prop-types";
import { OperationShape } from "./util/constants.js";
import ProcessingTemplate from "./processingtemplate";
import {
  operations,
  componentOperations
} from "./processing/operationtypes.js";

/**
 * Class for listing all operations, and managing their output
 */
class Geoprocessing extends Component {
  state = {
    operations: operations,
    componentOperations: componentOperations,
    listOpen: null
  };
  /**
   * Toggles which operation is expanded. Only one may be expanded at any time
   */
  handleToggle = name => {
    this.setState(prevState => {
      if (prevState.listOpen === name) {
        return { listOpen: null };
      } else {
        return { listOpen: name };
      }
    });
  };
  /**
   * Create clickable sidebar entity for each operation
   * @param {Object} operation The object describing the operation
   * @param {Boolean} popup If the operation is a whole component, or only a function
   */
  createProcessingTemplate = (operation, popup) => {
    return (
      <ProcessingTemplate
        key={operation.name}
        operation={operation}
        onToggle={this.handleToggle}
        onProcessingDone={this.props.onProcessingDone}
        listOpen={this.state.listOpen === operation.name}
        popup={popup}
      />
    );
  };
  render() {
    return (
      <div>
        <div className="group-divider">Geoprocessing</div>
        {this.state.componentOperations.map(operation =>
          this.createProcessingTemplate(operation, true)
        )}
        {this.state.operations.map(operation =>
          this.createProcessingTemplate(operation, false)
        )}
      </div>
    );
  }
}

Geoprocessing.propTypes = {
  operations: PropTypes.arrayOf(PropTypes.shape(OperationShape)),
  onProcessingDone: PropTypes.func.isRequired
};

export default Geoprocessing;
