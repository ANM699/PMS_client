import React, { Component, useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Card, Radio, Empty } from 'antd';
import { MenuOutlined, ProjectOutlined } from '@ant-design/icons';
import moment from 'moment';

import Column from '../../../components/board/column';
import TaskList from '../task/task';
import { reqTaskList } from '../../../api/index';
import { sortTasks, status } from '../../../utils/index';

// export default class Board extends Component {
//   state = {
//     value: 'board',
//     title: '',
//     // originalTasks: [],
//     tasks: {
//       todo: [],
//       doing: [],
//       done: [],
//     },
//   };

//   componentDidMount() {
//     const params = this.props.match.params;
//     //从菜单直接点进来，没有type和id
//     const type = params.type || 'sprint';
//     const id = params.id || '530000197311083057'; //todo:没有参数时，跳转到当前阶段的任务看板,这里id替换成当前阶段id

//     const title = (type === 'sprint' ? '阶段' : '需求') + id;
//     this.setState({
//       title,
//     });

//     reqTaskList({ type, id }).then((res) => {
//       const result = res.data;
//       if (result.code === 0) {
//         const originalTasks = result.data;
//         const tasks = sortTasks(originalTasks);
//         // console.log(tasks);
//         this.setState({
//           tasks,
//           // originalTasks,
//         });
//       }
//     });
//   }

//   onChange = (e) => {
//     this.setState({
//       value: e.target.value,
//     });
//   };

//   updateTasks = (tasks) => {
//     this.setState({
//       tasks: sortTasks(tasks),
//     });
//   };

//   /*方案1:如果需要将所有任务tasks作为store的一个属性，这里拖拽完后应该直接更新store.tasks的status，让页面自动重新渲染，但是会没有排序功能。
//   方案2:只是在前端更新组件state的tasks，拖拽后直接调用接口更新被拖拽任务的status,同时可以实现排序功能（实际没什么意义，刷新后顺序会变）。
//   两个方案不能同时使用，否则要么会导致store.tasks的状态更后端实际状态不一致，要么导致多次重新渲染。 */

//   //方案2
//   onDragEnd = (result) => {
//     const { destination, source, draggableId } = result;

//     if (!destination) {
//       return;
//     }

//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }

//     const start = source.droppableId;
//     const finish = destination.droppableId;

//     //查询被拖拽的task
//     const draggedTask = this.state.tasks[start].find(
//       (task) => task._id === draggableId
//     );
//     // const draggedTaskInOriginalTasks = this.state.originalTasks.find(
//     //   (task) => task._id === draggableId
//     // );

//     //todo：更新draggedTask的状态：更新后端数据库，如果成功再更新state
//     draggedTask.status = finish;
//     if (finish === 'todo') {
//       draggedTask.startDate = null;
//       draggedTask.endDate = null;
//     }
//     if (finish === 'doing') {
//       draggedTask.startDate = moment().format('YYYY-MM-DD');
//       draggedTask.endDate = null;
//     }
//     if (finish === 'done') draggedTask.endDate = moment().format('YYYY-MM-DD');
//     // draggedTaskInOriginalTasks.status = finish;

//     const { tasks } = this.state;
//     const startTasks = tasks[start];
//     const finishTasks = tasks[finish];

//     startTasks.splice(source.index, 1);
//     finishTasks.splice(destination.index, 0, draggedTask);

//     this.setState({
//       tasks,
//     });
//   };

//   render() {
//     const { tasks, value, title } = this.state;
//     const tasksOfList = Object.values(tasks).flat();

//     const boardView =
//       tasksOfList.length === 0 ? (
//         <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
//       ) : (
//         <DragDropContext onDragEnd={this.onDragEnd}>
//           <div style={{ display: 'flex' }}>
//             {Object.keys(status).map((c, index) => (
//               <Column status={status[c]} id={c} key={index} tasks={tasks[c]} />
//             ))}
//           </div>
//         </DragDropContext>
//       );
//     const listView = (
//       <TaskList
//         data={tasksOfList}
//         status={status}
//         updateTasks={this.updateTasks}
//       ></TaskList>
//     );

//     return (
//       <Card
//         title={title}
//         extra={
//           <Radio.Group
//             buttonStyle="solid"
//             onChange={this.onChange}
//             value={this.state.value}
//           >
//             <Radio.Button value="board">
//               <ProjectOutlined />
//             </Radio.Button>
//             <Radio.Button value="list">
//               <MenuOutlined />
//             </Radio.Button>
//           </Radio.Group>
//         }
//       >
//         {value === 'board' ? boardView : listView}
//       </Card>
//     );
//   }
// }

//hooks
export default function Board(props) {
  const [value, setValue] = useState('board');
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState({
    todo: [],
    doing: [],
    done: [],
  });

  useEffect(() => {
    const params = props.match.params;
    //从菜单直接点进来，没有type和id
    const type = params.type || 'sprint';
    const id = params.id || '530000197311083057'; //todo:没有参数时，跳转到当前阶段的任务看板,这里id替换成当前阶段id

    const title = (type === 'sprint' ? '阶段' : '需求') + id;
    setTitle(title);

    reqTaskList({ type, id }).then((res) => {
      const result = res.data;
      if (result.code === 0) {
        const originalTasks = result.data;
        const tasks = sortTasks(originalTasks);
        setTasks(tasks);
      }
    });
  }, []);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const updateTasks = (tasks) => {
    setTasks(sortTasks(tasks));
  };

  /*方案1:如果需要将所有任务tasks作为store的一个属性，这里拖拽完后应该直接更新store.tasks的status，让页面自动重新渲染，但是会没有排序功能。
  方案2:只是在前端更新组件state的tasks，拖拽后直接调用接口更新被拖拽任务的status,同时可以实现排序功能（实际没什么意义，刷新后顺序会变）。
  两个方案不能同时使用，否则要么会导致store.tasks的状态更后端实际状态不一致，要么导致多次重新渲染。 */

  //方案2
  const onDragEnd = (result) => {
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
    const draggedTask = tasks[start].find((task) => task._id === draggableId);
    // const draggedTaskInOriginalTasks = originalTasks.find(
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

    const startTasks = tasks[start];
    const finishTasks = tasks[finish];

    startTasks.splice(source.index, 1);
    finishTasks.splice(destination.index, 0, draggedTask);

    setTasks(tasks);
  };

  const tasksOfList = Object.values(tasks).flat();

  const boardView =
    tasksOfList.length === 0 ? (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    ) : (
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex' }}>
          {Object.keys(status).map((c, index) => (
            <Column status={status[c]} id={c} key={index} tasks={tasks[c]} />
          ))}
        </div>
      </DragDropContext>
    );
  const listView = (
    <TaskList
      data={tasksOfList}
      status={status}
      updateTasks={updateTasks}
    ></TaskList>
  );

  return (
    <Card
      title={title}
      extra={
        <Radio.Group buttonStyle="solid" onChange={onChange} value={value}>
          <Radio.Button value="board">
            <ProjectOutlined />
          </Radio.Button>
          <Radio.Button value="list">
            <MenuOutlined />
          </Radio.Button>
        </Radio.Group>
      }
    >
      {value === 'board' ? boardView : listView}
    </Card>
  );
}
