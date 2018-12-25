import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import PropTypes from "prop-types";
import { ItemTypes, LayerShape } from "./util/constants.js";
import flow from "lodash/flow";
import "./css/sidebar.css";

/**
 * For dragging the inputlayer.
 */
const operationSource = {
  //Contains the info of the dragged inputlayer
  beginDrag(props) {
    const item = {
      draggedId: props.layer.id,
      draggedName: props.layer.name,
      draggedData: props.layer.data
    };
    return item;
  },
  //Can only drag inputfield if they contain a layer, and there are more than one inputfield
  canDrag(props) {
    if (props.inputLayers > 1) {
      return props.layer !== null;
    }
    return false;
  }
};
/**
 *For dropping layers in the inputfields, and changing the order of the layers
 */
const operationTarget = {
  //Can drop if the field is empty, or if the layer is different from the dragged layer
  canDrop(props, monitor) {
    if (props.layer === null) {
      return true;
    }
    const { draggedId } = monitor.getItem();
    return props.layer.id !== draggedId;
  },
  //When dropping a layer, 'ProcessingTemplate' handle assigning layers to fields
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      const { draggedId, draggedName, draggedData } = monitor.getItem();
      const layer = { id: draggedId, name: draggedName, data: draggedData };
      props.onDrop(layer, props.index);
    }
  }
};
/**
 * Attributes used to make a field droppable
 */
function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}
/**
 * Attributes used to make a field draggable
 */
function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}
/**
 * Class for the droppable layer field in each operation.
 * Layers can be dropped from the layer list or from other processingfields
 */
class ProcessingField extends Component {
  /**
   * Render function
   * Contains a field which layers can be dropped on
   */
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
          {(!hasLayer && "Drop layer " + (this.props.index + 1) + " here") ||
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
