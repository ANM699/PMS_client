import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Card, Radio } from 'antd';
import { MenuOutlined, ProjectOutlined } from '@ant-design/icons';
import moment from 'moment';

import Column from '../../../components/board/column';
import List from '../../../components/board/list';
import { reqTaskList } from '../../../api/index';

const status = {
  todo: {
    color: '#4a9ff9',
    display: '未开始',
  },
  doing: {
    color: '#f9944a',
    display: '进行中',
  },
  done: {
    color: '#2ac06d',
    display: '已完成',
  },
};

export default class Board extends Component {
  state = {
    value: 'board',
    // originalTasks: [],
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
        const originalTasks = result.data;
        const tasks = this.state.tasks;
        originalTasks.forEach((task) => {
          tasks[task.status].push(task);
        });
        // console.log(tasks);
        this.setState({
          tasks,
          // originalTasks,
        });
      }
    });
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  /*方案1:如果需要将所有任务tasks作为store的一个属性，这里拖拽完后应该直接更新store.tasks的status，让页面自动重新渲染，但是会没有排序功能。
  方案2:只是在前端更新组件state的tasks，拖拽后直接调用接口更新被拖拽任务的status,同时可以实现排序功能（实际没什么意义，刷新后顺序会变）。
  两个方案不能同时使用，否则要么会导致store.tasks的状态更后端实际状态不一致，要么导致多次重新渲染。 */

  //方案2
  onDragEnd = (result) => {
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
    // const draggedTaskInOriginalTasks = this.state.originalTasks.find(
    //   (task) => task._id === draggableId
    // );

    //todo：更新draggedTask的状态：更新后端数据库，如果成功再更新state
    draggedTask.status = finish;
    if (finish === 'todo') {
      draggedTask.startDate = null;
      draggedTask.endDate = null;
    }
    if (finish === 'doing') {
      draggedTask.startDate = moment().format('YYYY-MM-DD');
      draggedTask.endDate = null;
    }
    if (finish === 'done') draggedTask.endDate = moment().format('YYYY-MM-DD');
    // draggedTaskInOriginalTasks.status = finish;

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
    const { tasks, value } = this.state;
    const tasksOfList = Object.values(tasks).flat();

    const boardView = (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div style={{ display: 'flex' }}>
          {Object.keys(status).map((c, index) => (
            <Column status={status[c]} id={c} key={index} tasks={tasks[c]} />
          ))}
        </div>
      </DragDropContext>
    );

    const listView = <List data={tasksOfList} status={status}></List>;

    return (
      <Card
        title="阶段"
        extra={
          <Radio.Group
            buttonStyle="solid"
            onChange={this.onChange}
            value={this.state.value}
          >
            <Radio.Button value="board">
              <ProjectOutlined />
            </Radio.Button>
            <Radio.Button value="list">
              {' '}
              <MenuOutlined />
            </Radio.Button>
          </Radio.Group>
        }
      >
        {value === 'board' ? boardView : listView}
      </Card>
    );
  }
}
