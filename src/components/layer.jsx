/**
 * Created by Hermann
 * Class for visualising and manipulating each layers in the sidebar
 */
import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import { ItemTypes, LayerShape, Actions } from "./util/constants";
import Properties from "./layerproperties";
import "./css/sidebar.css";
import "./css/contextmenu.css";

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
  //App handles sorting the layer list
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
 * TODO: Ved trykk, drop-down meny med ekstra egenskaper el:
 * Høyreklikk for å åpne meny med: properties: color, opacity(drag bar 0-100%), save, change name
 * Sender color change event til layers
 * Endre farge o.l
 */

class Layer extends Component {
  /**
   * TODO: Setup two types of actions:
   * 1: Can perform action immediatly: delete, zoom
   * 2: Open menu user can use to set new value, then execute: change name, color...
   */
  handleClick = action => {
    if (action === Actions.delete) {
      this.props.onDelete(this.props.layer.id);
    } else if (action === Actions.zoom) {
      this.props.onZoom(this.props.layer.id);
    } else if (action === Actions.properties) {
      this.props.openProperties(this.props.layer);
    }
  };
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
  createContexMenuItem = (action, description, icon) => {
    return (
      <MenuItem onClick={() => this.handleClick(action)}>
        {description}
        <img src={icon} className="icon" alt="" />
      </MenuItem>
    );
  };

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
          <ContextMenuTrigger id={this.props.index.toString()}>
            <span>{this.props.layer.name}</span>
            <div
              style={{
                height: "100%",
                width: "20px",
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
