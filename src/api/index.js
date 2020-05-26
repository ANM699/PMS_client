import ajax from './ajax';

export const reqLogin = ({ email, password }) => {
  return ajax('users/login', { email, password }, 'POST');
};
