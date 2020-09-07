import React, { Component } from 'react';
import './task.less';

export default class Task extends Component {
  render() {
    return <div className="wrap">{this.props.task.content}</div>;
  }
}
