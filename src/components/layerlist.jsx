import React, { Component } from "react";
import Layer from "./layer";
import "./css/sidebar.css";
import "./css/popup.css";
import PropTypes from "prop-types";
import { LayerShape } from "./util/constants.js";
import Properties from "./layerproperties";
import Popup from "reactjs-popup";

/**
 * Class for listing all layers in the sidebar. Contains all layers
 */
class LayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopup: false,
      layer: null,
      style: null
    };
  }
  /**
   * Open properties popup for specific layer
   */
  openPopup = layer => {
    this.setState({
      openPopup: true,
      layer: layer,
      style: this.props.stylemap.get(layer.id)
    });
  };
  closePopup = () => {
    this.setState({
      openPopup: false,
      layer: null,
      style: null
    });
  };

  /**
   * Render function
   * Contains popup with layer properties
   * All layers in a vertical list under the title
   */
  render() {
    return (
      <div>
        <div className="group-divider">Layers</div>
        <Popup open={this.state.openPopup} modal onClose={this.closePopup}>
          <Properties
            layer={this.state.layer}
            style={this.state.style}
            onNameChange={this.props.onNameChange}
            onStyleChange={this.props.onStyleChange}
            onDialogueFinished={this.closePopup}
          />
        </Popup>
        {this.props.layerlist.map((layer, index) => (
          <Layer
            key={layer.id}
            index={index}
            layer={layer}
            visible={this.props.visiblemap.get(layer.id)}
            style={this.props.stylemap.get(layer.id)}
            onDelete={this.props.onDelete}
            onToggle={this.props.onToggle}
            onMove={this.props.onMove}
            onZoom={this.props.onZoom}
            openPopup={this.openPopup}
          />
        ))}
      </div>
    );
  }
}

LayerList.propTypes = {
  layerlist: PropTypes.arrayOf(PropTypes.shape(LayerShape)),
  visiblemap: PropTypes.instanceOf(Map).isRequired,
  onMove: PropTypes.func.isRequired,
  layer: PropTypes.shape(LayerShape),
  index: PropTypes.number,
  visible: PropTypes.bool
};

export default LayerList;
