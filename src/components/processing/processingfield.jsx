import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import PropTypes from "prop-types";
import { ItemTypes, LayerShape } from "../util/constants.js";
import flow from "lodash/flow";
import "../css/sidebar.css";

const operationSource = {
  //The dragged item has id, name and data of layer
  beginDrag(props) {
    const item = {
      draggedId: props.layer.id,
      draggedName: props.layer.name,
      draggedData: props.layer.data
    };
    return item;
  },
  //Can not drag if one one possible layer, or if no layer is present
  canDrag(props) {
    if (props.inputLayers > 1) {
      return props.layer !== null;
    }
    return false;
  }
};
const operationTarget = {
  //Can drop if the field is empty, or if the layer has a different id from the dragged layer
  canDrop(props, monitor) {
    if (props.layer === null) {
      return true;
    }
    const { draggedId } = monitor.getItem();
    return props.layer.id !== draggedId;
  },
  //Template handles the drop logic in its handleDrop function
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      const { draggedId, draggedName, draggedData } = monitor.getItem();
      const layer = { id: draggedId, name: draggedName, data: draggedData };
      props.onDrop(layer, props.index);
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

class ProcessingField extends Component {
  render() {
    const {
      isDragging,
      isOver,
      connectDragSource,
      connectDropTarget
    } = this.props;
    const hasLayer = this.props.layer !== null;
    const canMove = hasLayer && this.props.inputLayers > 1;

    return connectDragSource(
      connectDropTarget(
        <div
          className="processing-field"
          style={{
            opacity: isDragging ? 0 : isOver ? 0.8 : 1,
            border: !hasLayer ? "2px dotted black" : "2px solid black",
            cursor: canMove ? "pointer" : "default"
          }}
        >
          {(!hasLayer && "Drop layer here") ||
            (hasLayer && this.props.layer.name)}
        </div>
      )
    );
  }
}

ProcessingField.propTypes = {
  layer: PropTypes.shape(LayerShape),
  hasLayer: PropTypes.bool,
  isDragging: PropTypes.bool,
  isOver: PropTypes.bool,
  inputLayers: PropTypes.number.isRequired
};

export default flow(
  DragSource(ItemTypes.OPERATION, operationSource, collectSource),
  DropTarget(
    [ItemTypes.LAYER, ItemTypes.OPERATION],
    operationTarget,
    collectTarget
  )
)(ProcessingField);
