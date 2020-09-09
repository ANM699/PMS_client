import Mock from 'mockjs';
import Cookies from 'js-cookie';

const api = 'http://localhost:3000';
Mock.mock(`${api}/users/login`, 'post', function (options) {
  const _id = Mock.mock('@id');
  Cookies.set('userId', _id);
  return {
    code: 0,
    data: {
      username: JSON.parse(options.body).username,
      _id,
    },
  };
});

Mock.mock(`${api}/projects/list`, 'get', function name() {
  const { data } = Mock.mock({
    'data|3-10': [
      {
        _id: /[A-Za-z0-9]{10}/,
        projectName: '@ctitle',
        description: '@cparagraph(2,3)',
      },
    ],
  });
  return {
    code: 0,
    data: [
      {
        _id: '1000000000',
        projectName: 'BesTV互联网电视移动助手小程序',
        description: '通过微信小程序实现登录，点播，聊天等大小屏互动功能。',
      },
      ...data,
    ],
  };
});
