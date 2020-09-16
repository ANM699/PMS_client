import * as types from './action-types';
import * as api from '../../api';

const receiveSprints = (sprints) => ({
  type: types.RECEIVE_SPRINTS,
  data: sprints,
});

const createSprints = (sprint) => ({
  type: types.CREATE_SPRINT,
  data: sprint,
});

export const createSprint = (sprint) => {
  return async (dispatch) => {
    const response = await api.reqCreateSprint(sprint);
    const result = response.data;
    if (result.code === 0) {
      dispatch(createSprints(result.data));
    }
  };
};

export const getSprints = () => {
  return async (dispatch) => {
    const response = await api.reqSprintList();
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveSprints(result.data));
    }
  };
};
