import React from 'react';
import PropTypes from 'prop-types';

import styles from './task-progress.module.less';

function genChildren(num, className) {
  let children = [];
  for (let index = 0; index < num; index++) {
    const element = (
      <div key={index} className={`${styles.block} ${className}`}></div>
    );
    children.push(element);
  }
  return children;
}

function TaskProgress(props) {
  return (
    <div className={styles.container}>
      {genChildren(props.todo, styles.todo)}
      {genChildren(props.doing, styles.doing)}
      {genChildren(props.done, styles.done)}
    </div>
  );
}

TaskProgress.propTypes = {
  todo: PropTypes.number.isRequired,
  doing: PropTypes.number.isRequired,
  done: PropTypes.number.isRequired,
};

export default TaskProgress;
