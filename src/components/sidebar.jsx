/**
 * Created by Hermann
 * Class the sidebar. Contains the layers, the operations and the upload file button
 */
import React, { Component } from "react";
import LayerList from "./layerlist";
import Geoprocessing from "./geoprocessing";
import Upload from "./upload";
import "./css/sidebar.css";
import PropTypes from "prop-types";
import { LayerShape } from "./util/constants";

class SideBar extends Component {
  /**
   * Render function.
   * Contains area for processing functions
   * area for layers
   * area for uploading files
   */
  render() {
    return (
      <nav id="sidebar" className="navbar bg-light">
        <Geoprocessing onProcessingDone={this.props.onProcessingDone} />
        <LayerList
          layerlist={this.props.layerlist}
          visiblemap={this.props.visiblemap}
          stylemap={this.props.stylemap}
          onDelete={this.props.onDelete}
          onToggle={this.props.onToggle}
          onMove={this.props.onMove}
          onZoom={this.props.onZoom}
          onNameChange={this.props.onNameChange}
          onStyleChange={this.props.onStyleChange}
        />
        <Upload onUpload={this.props.onUpload} />
      </nav>
    );
  }
}

SideBar.propTypes = {
  layerlist: PropTypes.arrayOf(PropTypes.shape(LayerShape)),
  visiblemap: PropTypes.instanceOf(Map).isRequired,
  onMove: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired
};

export default SideBar;
