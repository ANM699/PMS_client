import * as types from "./action-types";

const initUser = {
  username: "",
  email: "",
  msg: "",
};

export function user(state = initUser, action) {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return {
        ...action.data,
      };
    case types.RECEIVE_USER:
      return action.data;
    case types.RESET_USER:
      return {
        ...initUser,
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
