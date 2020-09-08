import * as types from './action-types';

const initProject = {
  projectName: '',
  startDate: null,
  endDate: null,
  description: '',
  msg: '',
};

export function project(state = initProject, action) {
  switch (action.type) {
    case types.SWITCH_PROJECT:
      return action.data;
    case types.RESET_PROJECT:
      return {
        ...initProject,
        msg: action.data,
      };
    case types.ERROR_MSG:
      return {
        ...state,
        msg: action.data,
      };
    default:
      return state;
  }
}

// export function projectList(state = [], action) {
//   switch (action.type) {
//     case types.RECEIVE_PROJECT_LIST:
//       return action.data;
//     case types.RECEIVE_NEW_PROJECT:
//       return [action.data, ...state];
//     default:
//       return state;
//   }
// }
