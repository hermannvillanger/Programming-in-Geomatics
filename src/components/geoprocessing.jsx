/**
 * Created by Hermann
 * Class for listing all operations, and managing their output
 */
import React, { Component } from "react";
import "./css/sidebar.css";
import PropTypes from "prop-types";
import { OperationShape } from "./util/constants.js";
import ProcessingTemplate from "./processing/template";
import { operations } from "./processing/operationtypes.js";

class Geoprocessing extends Component {
  state = {
    operations: operations,
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
  //TODO: Use props.openExtractor(layer) to open featureextractor
  //TODO: Absolute orientation, fix list to the top
  render() {
    return (
      <div>
        <div className="group-divider">Geoprocessing</div>
        {this.state.operations.map(operation => (
          <ProcessingTemplate
            key={operation.name}
            operation={operation}
            onToggle={this.handleToggle}
            onProcessingDone={this.props.onProcessingDone}
            listOpen={this.state.listOpen === operation.name}
          />
        ))}
      </div>
    );
  }
}

Geoprocessing.propTypes = {
  operations: PropTypes.arrayOf(PropTypes.shape(OperationShape)),
  onProcessingDone: PropTypes.func.isRequired
};

export default Geoprocessing;
