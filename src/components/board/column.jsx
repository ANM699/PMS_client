import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './item';

import styles from './column.module.less';

// const getListStyle = (isDraggingOver) => ({
//   background: isDraggingOver ? 'lightblue' : '',
// });

export default function Column({ status, tasks, id }) {
  return (
    <div className={styles.container}>
      <h4 className={styles.title} style={{ backgroundColor: status.color }}>
        {status.display}
      </h4>
      <Droppable
        droppableId={id}
        // isDropDisabled={this.props.id === 'todo'}
      >
        {(provided) => (
          <div
            className={styles.taskList}
            ref={provided.innerRef}
            {...provided.droppableProps}
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            {tasks.map((task, index) => (
              <Item key={task._id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
