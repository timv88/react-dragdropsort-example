import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';

var style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white'
};

var handleStyle = {
    backgroundColor: 'hotpink',
    cursor: 'move',
    width: '100%',
    height: '25px'
};

var cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index
        };
    }
};

var cardTarget = {
    hover(props, monitor, component) {
        var dragIndex = monitor.getItem().index;
        var hoverIndex = props.index;

        if(dragIndex === hoverIndex) {
            return;
        }

        // determine rectangle on screen
        var hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        // vertical center
        var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // mouse position
        var clientOffset = monitor.getClientOffset();
        // pixels to top of rectangle
        var hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // dragging downrwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        props.moveCard(dragIndex, hoverIndex);

        monitor.getItem().index = hoverIndex;
    }
}

class Card extends Component {
    render() {
        var { text, isDragging, connectDragSource, connectDropTarget, connectDragPreview } = this.props;
        var opacity = isDragging ? 0 : 1;

        return connectDropTarget(connectDragPreview(
            <div style={{ ...style, opacity }}>
                {connectDragSource(<div style={handleStyle} />)}
                {text}
            </div>
        ));
    }
}

Card.PropTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
};

function connectTarget(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

function connectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

export default DragSource(ItemTypes.CARD, cardSource, connectSource)(DropTarget(ItemTypes.CARD, cardTarget, connectTarget)(Card));


