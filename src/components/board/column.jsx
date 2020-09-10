import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";

import styles from "./column.module.less";

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "",
});

export default class Column extends Component {
  render() {
    let backgroundColor;
    switch (this.props.id) {
      case "todo":
        backgroundColor = "red";
        break;
      case "doing":
        backgroundColor = "yellow";
        break;
      case "done":
        backgroundColor = "lightgreen";
        break;
      default:
        break;
    }
    return (
      // <Droppable droppableId="droppable">
      //   {(provided, snapshot) => (
      //     <div
      //       className={styles.taskList}
      //       {...provided.droppableProps}
      //       ref={provided.innerRef}
      //       style={getListStyle(snapshot.isDraggingOver)}
      //     >
      //       {this.props.tasks.map((task, index) => (
      //         <Task key={task.id} task={task} index={index} />
      //       ))}
      //       {provided.placeholder}
      //     </div>
      //   )}
      // </Droppable>

      <div className={styles.container}>
        <h3 className={styles.title} style={{ backgroundColor }}>
          {this.props.title}
        </h3>
        <Droppable droppableId={this.props.id}>
          {(provided, snapshot) => (
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
