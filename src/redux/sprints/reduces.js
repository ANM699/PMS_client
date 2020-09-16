import * as types from './action-types';

const initSprints = [];

export function sprints(state = initSprints, action) {
  switch (action.type) {
    case types.RECEIVE_SPRINTS:
      return action.data;
    case types.CREATE_SPRINT:
      return [...state, action.data];
    default:
      return state;
  }
}
