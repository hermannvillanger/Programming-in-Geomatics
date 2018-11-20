/**
 * Created by Hermann
 * Class for visualising and manipulating each layers in the sidebar
 */
import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import { ItemTypes, LayerShape, Actions } from "./util/constants";
import "./css/sidebar.css";
import "./css/contextmenu.css";
import Popup from "reactjs-popup";
import Properties from "./layerproperties";

import flow from "lodash/flow";
import PropTypes from "prop-types";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import zoomIcon from "../images/iconzoom.svg";
import settingsIcon from "../images/iconsettings.svg";
import deleteIcon from "../images/icondelete.svg";

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

class Layer extends Component {
  constructor(props) {
    super(props);
    this.state = { openModal: false };
  }
  openProperties = () => {
    this.setState({ openModal: true });
  };
  closeProperties = () => {
    this.setState({ openModal: false });
  };
  /**
   * Method to decide which item was clicked and perform corresponding action
   */
  handleClick = action => {
    if (action === Actions.delete) {
      this.props.onDelete(this.props.layer.id);
    } else if (action === Actions.zoom) {
      this.props.onZoom(this.props.layer.id);
    } else if (action === Actions.properties) {
      this.openProperties();
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
   * Render function.
   * Contains popup with layer properties
   * Right click menu with options
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
            opacity: isDragging ? 0 : isOver ? 0.8 : 1
            //backgroundColor: this.props.style.color
          }}
        >
          <Popup
            open={this.state.openModal}
            modal
            onClose={this.closeProperties}
          >
            <Properties
              layer={this.props.layer}
              style={this.props.style}
              onNameChange={this.props.onNameChange}
              onStyleChange={this.props.onStyleChange}
              onDialogueFinished={this.closeProperties}
            />
          </Popup>
          <ContextMenuTrigger
            id={this.props.index.toString()}
            holdToDisplay={-1}
          >
            <span>{this.props.layer.name}</span>
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
