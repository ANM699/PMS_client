import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Column from "../../../components/backlog/column";
import initialData from "../../../static/initial-data";

export default class Backlog extends Component {
  state = initialData;

  onDragEnd = (result) => {};

  render() {
    return (
      <DragDropContext>
        {this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId) => this.state.tasks[taskId]
          );
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}
