import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, Avatar, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './task.module.less';
import moment from 'moment';

// const getItemStyle = (isDragging, draggableStyle) => ({
//   // change background colour if dragging
//   background: isDragging ? 'lightgreen' : '',
//   // styles we need to apply on draggables
//   ...draggableStyle,
// });
const displayDate = (task) => {
  switch (task.status) {
    case 'todo':
      return (
        // <Tooltip title={task.createDate} placement="top">
        //   {'创建于' + moment(task.createDate).fromNow()}
        // </Tooltip>
        '创建于' + moment(task.createDate).format('MM-DD')
      );
    case 'doing':
      return (
        // <Tooltip title={task.startDate} placement="top">
        //   {'开始于' + moment(task.startDate).fromNow()}
        // </Tooltip>
        '开始于' + moment(task.startDate).format('MM-DD')
      );
    case 'done':
      return (
        // <Tooltip title={task.endDate} placement="top">
        //   {'完成于' + moment(task.endDate).fromNow()}
        // </Tooltip>
        '完成于' + moment(task.endDate).format('MM-DD')
      );
    default:
      break;
  }
};

export default class Task extends Component {
  render() {
    const { task, index } = this.props;
    return (
      <Draggable
        draggableId={task._id}
        index={index}
        // isDragDisabled={task.status === 'done'}
      >
        {(provided, snapshot) => (
          <div
            className={styles.container}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // style={getItemStyle(
            //   snapshot.isDragging,
            //   provided.draggableProps.style
            // )}
          >
            <Card hoverable={true}>
              <p>{task.content}</p>
              <div className={styles.date}>{displayDate(task)}</div>
              <div>
                <Avatar.Group>
                  {task.users.map((user) => (
                    <Tooltip
                      key={user._id}
                      title={user.username}
                      placement="top"
                    >
                      <Avatar
                        style={{ backgroundColor: user.avatar }}
                        icon={<UserOutlined />}
                      />
                    </Tooltip>
                  ))}
                </Avatar.Group>
              </div>
            </Card>
          </div>
        )}
      </Draggable>
    );
  }
}
