import * as types from './action-types';
import * as api from '../../api';

//用户
const authSuccess = (user) => ({ type: types.AUTH_SUCCESS, data: user });

const receiveUser = (user) => ({ type: types.RECEIVE_USER, data: user });

const errorMsg = (msg) => ({ type: types.ERROR_MSG, data: msg });

export const resetUser = (msg) => {
  return { type: types.RESET_USER, data: msg };
};

export const login = (user) => {
  const { username, password } = user;
  if (!username || !password) {
    return errorMsg('请输入用户名和密码');
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

//获取用户信息
export const getUser = () => {
  return async (dispatch) => {
    const response = await api.reqUser();
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};
