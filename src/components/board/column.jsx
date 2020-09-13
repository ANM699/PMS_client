import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";

import styles from "./column.module.less";

// const getListStyle = (isDraggingOver) => ({
//   background: isDraggingOver ? 'lightblue' : '',
// });

export default class Column extends Component {
  render() {
    let backgroundColor;
    switch (this.props.id) {
      case "todo":
        backgroundColor = "#4a9ff9";
        break;
      case "doing":
        backgroundColor = "#f9944a";
        break;
      case "done":
        backgroundColor = "#2ac06d";
        break;
      default:
        break;
    }
    return (
      <div className={styles.container}>
        <h3 className={styles.title} style={{ backgroundColor }}>
          {this.props.title}
        </h3>
        <Droppable droppableId={this.props.id}>
          {(provided) => (
            <div
              className={styles.taskList}
              ref={provided.innerRef}
              {...provided.droppableProps}
              // style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.tasks.map((task, index) => (
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
