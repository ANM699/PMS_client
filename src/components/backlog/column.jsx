import React, { Component } from "react";
import Task from "./task";

import styles from "./column.module.less";

export default class Column extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>{this.props.column.title}</h3>
        <div className={styles.taskList}>
          {this.props.tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
    );
  }
}
