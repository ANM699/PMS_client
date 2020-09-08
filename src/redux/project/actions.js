import * as types from './action-types';
import * as api from '../../api';

//项目
// const receiveProjectList = (projectList) => ({
//   type: types.RECEIVE_PROJECT_LIST,
//   data: projectList,
// });

// const receiveNewProject = (project) => ({
//   type: types.RECEIVE_NEW_PROJECT,
//   data: project,
// });

const errorMsg = (msg) => ({ type: types.ERROR_MSG, data: msg });

export const switchProject = (project) => ({
  type: types.SWITCH_PROJECT,
  data: project,
});

export const resetProject = (msg) => ({ type: types.RESET_PROJECT, data: msg });

// export const createProject = (project) => {
//   return async (dispatch) => {
//     const response = await api.reqCreateProject(project);
//     const result = response.data;
//     if (result.code === 0) {
//       dispatch(receiveNewProject(result.data));
//     } else {
//       dispatch(errorMsg(result.msg));
//     }
//   };
// };

export const getProject = () => {
  return async (dispatch) => {
    const response = await api.reqProject();
    const result = response.data;
    if (result.code === 0) {
      dispatch(switchProject(result.data));
    } else {
      dispatch(resetProject(result.msg));
    }
  };
};

// export const getProjectList = () => {
//   return async (dispatch) => {
//     const response = await api.reqProjectList();
//     const result = response.data;
//     if (result.code === 0) {
//       dispatch(receiveProjectList(result.data));
//     }
//   };
// };
