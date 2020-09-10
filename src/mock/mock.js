import Mock from 'mockjs';
import Cookies from 'js-cookie';

const api = 'http://mock';

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

Mock.mock(`${api}/users/register`, 'post', function (options) {
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

Mock.mock(`${api}/users/user`, 'get', function () {
  return {
    code: 0,
    data: {
      username: Mock.mock('@last'),
      _id: Cookies.get('userId'),
    },
  };
});

Mock.mock(`${api}/projects/list`, 'get', function () {
  const { data } = Mock.mock({
    'data|5-10': [
      {
        _id: '@id',
        projectName: '@ctitle',
        description: '@cparagraph(2,3)',
      },
    ],
  });
  return {
    code: 0,
    data: [
      // {
      //   _id: '1000000000',
      //   projectName: 'BesTV互联网电视助手',
      //   description: '通过微信小程序实现登录，点播，聊天等大小屏互动功能。',
      // },
      ...data,
    ],
  };
});

Mock.mock(`${api}/projects/create`, 'post', function (options) {
  return {
    code: 0,
    data: {
      ...JSON.parse(options.body),
      _id: Mock.mock('@id'),
    },
  };
});

Mock.mock(`${api}/projects/project`, 'get', function () {
  return {
    code: 0,
    data: {
      projectName: Mock.mock('@ctitle'),
      description: Mock.mock('@cparagraph(2,3)'),
      _id: Cookies.get('projectId'),
    },
  };
});

Mock.mock(`${api}/tasks/list`, 'get', function () {
  return {
    code: 0,
    ...Mock.mock({
      'data|20-30': [
        {
          _id: '@id',
          taskName: '@csentence',
          'status|1': ['todo', 'doing', 'done'],
          storyId: '@id',
          projectId: Cookies.get('projectId'),
        },
      ],
    }),
  };
});
