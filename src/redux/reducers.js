/*
包含多个用于生成新的state 的reducer 函数的模块
*/
import { combineReducers } from "redux";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER,
  RESET_PROJECT,
  SWITCH_PROJECT,
  RECEIVE_PROJECT_LIST,
  RECEIVE_NEW_PROJECT,
} from "./action-types";

const initUser = {
  username: "",
  email: "",
  msg: "",
};

function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...action.data,
      };
    case RECEIVE_USER:
      return action.data;
    case RESET_USER:
      return {
        ...initUser,
        msg: action.data,
      };
    case ERROR_MSG:
      return {
        ...state,
        msg: action.data,
      };
    default:
      return state;
  }
}

const initProject = {
  projectName: "",
  startDate: null,
  endDate: null,
  description: "",
  msg: "",
};

function project(state = initProject, action) {
  switch (action.type) {
    case SWITCH_PROJECT:
      return action.data;
    case RESET_PROJECT:
      return initProject;
    case ERROR_MSG:
      return {
        ...state,
        msg: action.data,
      };
    default:
      return state;
  }
}

function projectList(state = [], action) {
  switch (action.type) {
    case RECEIVE_PROJECT_LIST:
      return action.data;
    case RECEIVE_NEW_PROJECT:
      return [action.data, ...state];
    default:
      return state;
  }
}
// 返回合并后的reducer 函数
export default combineReducers({
  user,
  project,
  projectList,
});
