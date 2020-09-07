import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";

import styles from "./column.module.less";

export default class Column extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>{this.props.column.title}</h3>
        <Droppable droppableId={this.props.column.id}>
          {(provided) => (
            <div
              className={styles.taskList}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
