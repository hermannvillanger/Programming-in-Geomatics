/**
 * Created by Hermann
 * Class for listing all layers in the sidebar. Contains all layers
 */
import React, { Component } from "react";
import Layer from "./layer";
import "./css/sidebar.css";
import PropTypes from "prop-types";
import { LayerShape } from "./util/constants.js";

class LayerList extends Component {
  render() {
    return (
      <div>
        <div className="group-divider">Layers</div>
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
            onNameChange={this.props.onNameChange}
            onStyleChange={this.props.onStyleChange}
            openProperties={this.props.openProperties}
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
