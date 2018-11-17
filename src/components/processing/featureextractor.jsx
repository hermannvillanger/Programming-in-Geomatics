import React, { Component } from "react";

class Extractor extends Component {
  constructor(props) {
    super(props);
    const extractors = [];
    this.state = { extractors: extractors };
  }
  onExecute = () => {
    //Execute function
  };
  onCancel = () => {
    //Cancel function
  };
  addExtraction = () => {
    this.setState(prevState => {
      //
    });
  };
  /**
   * For selecting data from a layer.
   * TODO: Should have data we select by, how we filter(==,>,<= etc), value we choose
   * button for deleting selector
   * Should get suggestions for values in dropdown
   */
  createSelectFields = () => {
    //Create x number of fields. Store in state as array
  };

  render() {
    return (
      <div>
        {this.createSelectFields()}
        <button onClick={this.addExtraction}>Add extraction</button>
        <button onClick={this.onCancel}>Cancel</button>
        <button onClick={this.onExecute}>Start</button>
      </div>
    );
  }
}

export default Extractor;
