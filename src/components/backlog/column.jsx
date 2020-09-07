import React, { Component } from 'react';
import Task from './task';

import './column.less';

export default class Column extends Component {
  render() {
    return (
      <div className="container">
        <h3 className="title">{this.props.column.title}</h3>
        <div className="taskList">
          {this.props.tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
    );
  }
}
