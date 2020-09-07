import React, { Component } from "react";
import styles from "./task.module.less";

export default class Task extends Component {
  render() {
    return <div className={styles.container}>{this.props.task.content}</div>;
  }
}
