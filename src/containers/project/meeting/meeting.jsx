import React, { Component } from 'react';

import TaskProgress from '../../../components/task-progress/task-progress';

export default class Meeting extends Component {
  render() {
    return <TaskProgress todo={3} doing={5} done={4} />;
  }
}
