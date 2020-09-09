import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import Column from '../../../components/board/column';
import { reqTaskList } from '../../../api/index';

export default class Board extends Component {
  state = {
    tasks: {
      todo: [],
      doing: [],
      done: [],
    },
    // tasks: {
    //   'task-1': { id: 'task-1', content: 'Take out the garbage' },
    //   'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    //   'task-3': { id: 'task-3', content: 'Charge my phone' },
    //   'task-4': { id: 'task-4', content: 'Cook dinner' },
    // },
    // columns: {
    //   'column-1': {
    //     id: 'column-1',
    //     title: 'To do',
    //     taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    //   },
    //   'column-2': {
    //     id: 'column-2',
    //     title: 'Doing',
    //     taskIds: [],
    //   },
    //   'column-3': {
    //     id: 'column-3',
    //     title: 'Done',
    //     taskIds: [],
    //   },
    // },
    // Facilitate reordering of the columns
    // columnOrder: ['column-1', 'column-2', 'column-3'],
  };

  componentDidMount() {
    reqTaskList().then((res) => {
      const result = res.data;
      if (result.code === 0) {
        const tasks = this.state.tasks;
        result.data.forEach((task) => {
          tasks[task.status].push(task);
        });
        console.log(tasks);
        this.setState({
          tasks,
        });
      }
    });
  }

  onDragEnd = (result) => {
    console.log(result);
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    //查询被拖拽的task
    const draggedTask = this.state.tasks[start].find(
      (task) => task._id === draggableId
    );

    const { tasks } = this.state;
    const startTasks = tasks[start];
    const finishTasks = tasks[finish];

    startTasks.splice(source.index, 1);
    finishTasks.splice(destination.index, 0, draggedTask);

    this.setState({
      tasks,
    });
  };
  render() {
    const { tasks } = this.state;
    return (
      // <DragDropContext onDragEnd={this.onDragEnd}>
      //   <div style={{ display: 'flex' }}>
      //     {this.state.columnOrder.map((columnId) => {
      //       const column = this.state.columns[columnId];
      //       const tasks = column.taskIds.map(
      //         (taskId) => this.state.tasks[taskId]
      //       );
      //       return <Column key={column.id} column={column} tasks={tasks} />;
      //     })}
      //   </div>
      // </DragDropContext>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div style={{ display: 'flex' }}>
          <Column title="未开始" id="todo" tasks={tasks.todo} />
          <Column title="进行中" id="doing" tasks={tasks.doing} />
          <Column title="已完成" id="done" tasks={tasks.done} />
        </div>
      </DragDropContext>
    );
  }
}
