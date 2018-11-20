import React, { Component } from "react";

class FeatureExtractor extends Component {
  constructor(props) {
    super(props);
    const extractors = [];
    this.state = { extractors: extractors };
  }
  onExecute = () => {
    const data = this.props.layer.data;
    data.features = [];
    this.props.layer.data.features.forEach(feature => {
      if (this.checkExtractions(feature)) {
        data.features.add(feature);
      }
    });

    const newName = "Name";
    const extractedLayer = { name: newName, data: data };

    this.props.onExecute(extractedLayer);
  };
  checkExtractions = feature => {
    let fulfill = true;
    feature.properties.forEach(property => {
      //TODO: Compare to all demands
    });
    return fulfill;
  };

  onCancel = () => {
    this.props.onClose();
    //Cancel function
  };
  addExtraction = () => {
    this.setState(prevState => {
      return { extractors: prevState.extractors };
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
    const layer = this.props.layers[0];
    console.log(layer);
    const categories = layer.data.features.properties;
    categories.forEach(category => {
      console.log(category);
      //Each feature element:
    });
    /**
     * layer.data.features.properties[0,1,....]
     * Properties - kan brukes
     *  Alle typer elementer i properties hentes ut, for det valgte: hent alle muligheter i de andre featurene
     */
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

export default FeatureExtractor;
