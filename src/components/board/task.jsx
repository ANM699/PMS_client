import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styles from './task.module.less';

const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default class Task extends Component {
  render() {
    return (
      // <Draggable
      //   key={this.props.task.id}
      //   draggableId={this.props.task.id}
      //   index={this.props.index}
      // >
      //   {(provided, snapshot) => (
      //     <div
      //       ref={provided.innerRef}
      //       {...provided.draggableProps}
      //       {...provided.dragHandleProps}
      //       className={styles.container}
      //       style={getItemStyle(
      //         snapshot.isDragging,
      //         provided.draggableProps.style
      //       )}
      //     >
      //       {this.props.task.content}
      //     </div>
      //   )}
      // </Draggable>
      <Draggable draggableId={this.props.task._id} index={this.props.index}>
        {(provided, snapshot) => (
          <div
            className={styles.container}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            {this.props.task.taskName}
          </div>
        )}
      </Draggable>
    );
  }
}
