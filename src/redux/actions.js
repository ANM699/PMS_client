import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  SWITCH_PROJECT,
  RECEIVE_PROJECT_LIST,
  RECEIVE_NEW_PROJECT,
} from "./action-types";
import * as api from "../api";

//用户
export const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user });

export const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg });

export const resetUser = (msg) => {
  return { type: RESET_USER, data: msg };
};

export const login = (user) => {
  const { email, password } = user;
  if (!email || !password) {
    return errorMsg("请输入邮箱和密码");
  }
  return async (dispatch) => {
    const response = await api.reqLogin(user);
    const result = response.data;
    if (result.code === 0) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};

//项目
const receiveProjectList = (projectList) => ({
  type: RECEIVE_PROJECT_LIST,
  data: projectList,
});

const receiveNewProject = (project) => ({
  type: RECEIVE_NEW_PROJECT,
  data: project,
});

export const switchProject=(project)=>({type:SWITCH_PROJECT,data:project});

export const createProject = (project) => {
  return async (dispatch) => {
    const response = await api.reqCreateProject(project);
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveNewProject(result.data));
    } else {
      // dispatch();
    }
  };
};

export const getProjectList = () => {
  return async (dispatch) => {
    const response = await api.reqProjectList();
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveProjectList(result.data));
    }
  };
};
