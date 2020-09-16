/*
包含多个用于生成新的state 的reducer 函数的模块
*/
import { combineReducers } from 'redux';

import { user } from './user/reduces';
import { project } from './project/reduces';
import { sprints } from './sprints/reduces';

// 返回合并后的reducer 函数
export default combineReducers({
  user,
  project,
  sprints,
  // projectList,
});
