/*
包含多个用于生成新的state 的reducer 函数的模块
*/
import { combineReducers } from 'redux';
import { AUTH_SUCCESS, ERROR_MSG } from './action-types';

const initUser = {
  username: '',
  email: '',
  msg: '',
  redirectTo: '',
};

function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...action.data, redirectTo: '/my' };
    case ERROR_MSG:
      return { ...state, msg: action.msg };
    default:
      return state;
  }
}
// 返回合并后的reducer 函数
export default combineReducers({
  user,
});
