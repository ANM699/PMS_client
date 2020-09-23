import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";

import styles from "./column.module.less";

// const getListStyle = (isDraggingOver) => ({
//   background: isDraggingOver ? 'lightblue' : '',
// });

export default class Column extends Component {
  render() {
    const { status, tasks } = this.props;
    return (
      <div className={styles.container}>
        <h4 className={styles.title} style={{ backgroundColor: status.color }}>
          {status.display}
        </h4>
        <Droppable droppableId={this.props.id}>
          {(provided) => (
            <div
              className={styles.taskList}
              ref={provided.innerRef}
              {...provided.droppableProps}
              // style={getListStyle(snapshot.isDraggingOver)}
            >
              {tasks.map((task, index) => (
                <Task key={task._id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
