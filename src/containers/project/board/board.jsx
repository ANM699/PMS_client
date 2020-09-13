import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Column from "../../../components/board/column";
import { reqTaskList } from "../../../api/index";

export default class Board extends Component {
  state = {
    tasks: {
      todo: [],
      doing: [],
      done: [],
    },
  };

  componentDidMount() {
    reqTaskList().then((res) => {
      const result = res.data;
      if (result.code === 0) {
        const tasks = this.state.tasks;
        result.data.forEach((task) => {
          tasks[task.status].push(task);
        });
        // console.log(tasks);
        this.setState({
          tasks,
        });
      }
    });
  }

  /*方案1:如果需要将所有任务tasks作为store的一个属性，这里拖拽完后应该直接更新store.tasks的status，让页面自动重新渲染，但是会没有排序功能。
  方案2:只是在前端更新组件state的tasks，拖拽后直接调用接口更新被拖拽任务的status,同时可以实现排序功能（实际没什么意义，刷新后顺序会变）。
  两个方案不能同时使用，否则要么会导致store.tasks的状态更后端实际状态不一致，要么导致多次重新渲染。 */

  //方案2
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

    //todo：更新draggedTask的状态：更新后端数据库，如果成功再更新state
    draggedTask.status = finish;

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
        <div style={{ display: "flex" }}>
          <Column title="未开始" id="todo" tasks={tasks.todo} />
          <Column title="进行中" id="doing" tasks={tasks.doing} />
          <Column title="已完成" id="done" tasks={tasks.done} />
        </div>
      </DragDropContext>
    );
  }
}
