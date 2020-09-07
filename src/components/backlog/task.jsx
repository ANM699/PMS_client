import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";

import styles from "./task.module.less";

export default class Task extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={styles.container}
          >
            {this.props.task.content}
          </div>
        )}
      </Draggable>
    );
  }
}
