import { AUTH_SUCCESS, ERROR_MSG,RESET_USER } from './action-types';
import { reqLogin } from '../api';

export const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user });

export const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg });

export const resetUser = msg => {
  return { type: RESET_USER, data: msg };
};

export const login = (user) => {
  const { email, password } = user;
  if (!email || !password) {
    return errorMsg('请输入邮箱和密码');
  }
  return async (dispatch) => {
    const response = await reqLogin(user);
    const result = response.data;
    if (result.code === 0) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};
