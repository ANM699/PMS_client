import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, Avatar, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './task.module.less';

const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '',
  // styles we need to apply on draggables
  ...draggableStyle,
});

export default class Task extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.task._id} index={this.props.index}>
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
              <p>{this.props.task.taskName}</p>
              <div style={{ textAlign: 'right' }}>
                <Avatar.Group>
                  {this.props.task.users.map((user) => (
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
