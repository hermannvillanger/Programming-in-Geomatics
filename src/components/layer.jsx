import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import { ItemTypes, LayerShape } from "./util/constants";
import "./css/sidebar.css";
import "./css/contextmenu.css";
import "./css/popup.css";

import flow from "lodash/flow";
import PropTypes from "prop-types";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import zoomIcon from "../images/iconzoom.svg";
import settingsIcon from "../images/iconsettings.svg";
import deleteIcon from "../images/icondelete.svg";

/**
 * The different actions in the layers right click menu
 */
const Actions = {
  delete: "delete",
  zoom: "zoom",
  properties: "properties"
};

/**
 * Also must be dropped in processingfield. Use itemtypes operation for that
 */
const layerSource = {
  beginDrag(props) {
    const item = {
      draggedId: props.layer.id,
      draggedIndex: props.index,
      draggedName: props.layer.name,
      draggedData: props.layer.data
    };
    return item;
  }
};
const layerTarget = {
  //Cannot drop on the same layer
  canDrop(props, monitor) {
    let { draggedId } = monitor.getItem();
    return draggedId !== props.layer.id;
  },
  //App handles sorting of the layer list
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      let { draggedId } = monitor.getItem();
      props.onMove(draggedId, props.index);
    }
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}
function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}
/**
 * Class for visualizing the geojson layer in the sidebar
 */
class Layer extends Component {
  /**
   * Method to decide which item was clicked and perform corresponding action
   */
  handleClick = action => {
    if (action === Actions.delete) {
      this.props.onDelete(this.props.layer.id);
    } else if (action === Actions.zoom) {
      this.props.onZoom(this.props.layer.id);
    } else if (action === Actions.properties) {
      this.props.openPopup(this.props.layer);
    }
  };
  /**
   * Creates right click menu for render function.
   * Uses createContexMenuItem for every item in the list
   */
  createContexMenu = () => {
    return (
      <div>
        <ContextMenu id={this.props.index.toString()}>
          {this.createContexMenuItem(
            Actions.properties,
            "Properties",
            settingsIcon
          )}
          <MenuItem divider />
          {this.createContexMenuItem(Actions.zoom, "Zoom to layer", zoomIcon)}
          <MenuItem divider />
          {this.createContexMenuItem(
            Actions.delete,
            "Delete layer",
            deleteIcon
          )}
        </ContextMenu>
      </div>
    );
  };
  /**
   * Each item in the right click menu
   * Has onClick function, description and a small icon
   */
  createContexMenuItem = (action, description, icon) => {
    return (
      <MenuItem onClick={() => this.handleClick(action)}>
        {description}
        <img src={icon} className="icon" alt="" />
      </MenuItem>
    );
  };
  /**
   * Render function
   * Contains right click menu with options
   * Name of layer
   * Square with color of layer
   * Checkbox for toggling visibility
   */
  render() {
    const {
      isDragging,
      isOver,
      connectDragSource,
      connectDropTarget
    } = this.props;
    return connectDragSource(
      connectDropTarget(
        <div
          className="layer"
          style={{
            opacity: isDragging ? 0 : 1,
            backgroundColor: isOver
              ? "rgb(120, 120, 120)"
              : "rgb(217, 217, 217)"
          }}
        >
          <ContextMenuTrigger
            id={this.props.index.toString()}
            holdToDisplay={-1}
          >
            <span>{this.props.layer.name}</span>
            {/*FIXME: Overflow of name/Size */}
            <div
              style={{
                height: "20px",
                width: "20px",
                float: "left",
                backgroundColor: this.props.style.color
              }}
            />
            <input
              type="checkbox"
              style={{ float: "right" }}
              checked={this.props.visible}
              onChange={() => this.props.onToggle(this.props.layer.id)}
            />
          </ContextMenuTrigger>
          {this.createContexMenu()}
        </div>
      )
    );
  }
}

Layer.propTypes = {
  layer: PropTypes.shape(LayerShape).isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  onMove: PropTypes.func
};

export default flow(
  DragSource(ItemTypes.LAYER, layerSource, collectSource),
  DropTarget(ItemTypes.LAYER, layerTarget, collectTarget)
)(Layer);
