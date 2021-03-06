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
  const body = JSON.parse(options.body);
  if (body.username === 'guoyunxiang') {
    return {
      code: 1,
      msg: '用户名已经被注册',
    };
  }
  const _id = Mock.mock('@id');
  Cookies.set('userId', _id);
  return {
    code: 0,
    data: {
      username: body.username,
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
        startDate: '2020-07-14',
        endDate: '2020-12-24',
      },
    ],
  });
  return {
    code: 0,
    data: [
      // {
      //   _id: "1000000000",
      //   projectName: "BesTV互联网电视助手",
      //   description: "通过微信小程序实现登录，点播，聊天等大小屏互动功能。",
      //   startDate: "2020-08-04",
      //   endDate: "2020-12-31",
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

Mock.mock(RegExp(`${api}/projects/edit/` + '.*'), 'post', function (options) {
  return {
    code: 0,
    data: {
      ...JSON.parse(options.body),
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
      startDate: '2020-07-14',
      endDate: '2020-12-24',
    },
  };
});

Mock.mock(RegExp(`${api}/tasks/list` + '.*'), 'get', function (options) {
  return {
    code: 0,
    ...Mock.mock({
      'data|10-15': [
        {
          _id: '@id',
          content: '@csentence',
          'status|1': ['todo', 'doing', 'done'],
          storyId: '@id',
          projectId: Cookies.get('projectId'),
          createDate: '@date',
          startDate: function () {
            return this.status !== 'todo' ? Mock.mock('@date') : null;
          },
          endDate: function () {
            return this.status === 'done' ? Mock.mock('@date') : null;
          },
          'users|0-5': [
            {
              _id: '@id',
              'avatar|1': ['#f56a00', '#7265e6', '#00a2ae'],
              username: '@last',
            },
          ],
        },
      ],
    }),
  };
});

Mock.mock(`${api}/projects/members`, 'get', function () {
  return {
    code: 0,
    ...Mock.mock({
      'data|8-12': [
        {
          _id: '@id',
          'avatar|1': ['#f56a00', '#7265e6', '#00a2ae'],
          username: '@last',
          email: '@email',
          'roles|1-4': [
            {
              'color|1': ['#f56a00', '#7265e6', '#00a2ae', '#ffbf00'],
              'name|1': ['项目经理', '前端开发', '后端开发', 'UI设计'],
            },
          ],
        },
      ],
    }),
  };
});

Mock.mock(`${api}/users/list`, 'get', function () {
  return {
    code: 0,
    ...Mock.mock({
      'data|5-8': [
        {
          _id: '@id',
          'avatar|1': ['#f56a00', '#7265e6', '#00a2ae'],
          username: '@last',
          email: '@email',
        },
      ],
    }),
  };
});

Mock.mock(`${api}/sprints/create`, 'post', function (options) {
  return {
    code: 0,
    data: {
      _id: Mock.mock('@id'),
      ...JSON.parse(options.body),
      tasks: {
        todo: [],
        doing: [],
        done: [],
      },
    },
  };
});

Mock.mock(`${api}/sprints/list`, 'get', function () {
  return {
    code: 0,
    data: [
      {
        _id: Mock.mock('@id'),
        startDate: '2020-07-14',
        endDate: '2020-07-30',
        ...Mock.mock({
          'tasks|10-20': [
            {
              _id: '@id',
              content: '@csentence',
              'status|1': ['todo', 'doing', 'done'],
              projectId: Cookies.get('projectId'),
              createDate: '@date',
              startDate: function () {
                return this.status !== 'todo' ? Mock.mock('@date') : null;
              },
              endDate: function () {
                return this.status === 'done' ? Mock.mock('@date') : null;
              },
              'users|0-5': [
                {
                  _id: '@id',
                  'avatar|1': ['#f56a00', '#7265e6', '#00a2ae'],
                  username: '@last',
                },
              ],
            },
          ],
        }),
      },
      {
        _id: Mock.mock('@id'),
        startDate: '2020-07-31',
        endDate: '2020-08-26',
        ...Mock.mock({
          'tasks|10-20': [
            {
              _id: '@id',
              content: '@csentence',
              'status|1': ['todo', 'doing', 'done'],
              projectId: Cookies.get('projectId'),
              createDate: '@date',
              startDate: function () {
                return this.status !== 'todo' ? Mock.mock('@date') : null;
              },
              endDate: function () {
                return this.status === 'done' ? Mock.mock('@date') : null;
              },
              'users|0-5': [
                {
                  _id: '@id',
                  'avatar|1': ['#f56a00', '#7265e6', '#00a2ae'],
                  username: '@last',
                },
              ],
            },
          ],
        }),
      },
      {
        _id: Mock.mock('@id'),
        startDate: '2020-08-27',
        endDate: '2020-09-13',
        ...Mock.mock({
          'tasks|10-20': [
            {
              _id: '@id',
              content: '@csentence',
              'status|1': ['todo', 'doing', 'done'],
              projectId: Cookies.get('projectId'),
              createDate: '@date',
              startDate: function () {
                return this.status !== 'todo' ? Mock.mock('@date') : null;
              },
              endDate: function () {
                return this.status === 'done' ? Mock.mock('@date') : null;
              },
              'users|0-5': [
                {
                  _id: '@id',
                  'avatar|1': ['#f56a00', '#7265e6', '#00a2ae'],
                  username: '@last',
                },
              ],
            },
          ],
        }),
      },
    ],
  };
});

Mock.mock(`${api}/stories/list`, 'get', function () {
  return {
    code: 0,
    ...Mock.mock({
      'data|8-10': [
        {
          _id: '@id',
          'role|1': ['用户', 'VIP', '管理员', '项目经理'],
          activity: '@cword(10, 15)',
          date: '@date',
          'priority|1': [0, 1, 2],
          businessValue: '@cword(10, 15)',
          'tasks|3-5': [
            {
              _id: '@id',
              content: '@csentence',
              'status|1': ['todo', 'doing', 'done'],
              projectId: Cookies.get('projectId'),
              createDate: '@date',
              startDate: function () {
                return this.status !== 'todo' ? Mock.mock('@date') : null;
              },
              endDate: function () {
                return this.status === 'done' ? Mock.mock('@date') : null;
              },
              'users|0-5': [
                {
                  _id: '@id',
                  'avatar|1': ['#f56a00', '#7265e6', '#00a2ae'],
                  username: '@last',
                },
              ],
            },
          ],
        },
      ],
    }),
  };
});

Mock.mock(`${api}/tasks/create`, 'post', function (options) {
  return {
    code: 0,
    data: {
      ...JSON.parse(options.body),
      _id: Mock.mock('@id'),
      projectId: Cookies.get('projectId'),
    },
  };
});

Mock.mock(`${api}/storys/create`, 'post', function (options) {
  return {
    code: 0,
    data: {
      ...JSON.parse(options.body),
      _id: Mock.mock('@id'),
      tasks: {
        todo: [],
        doing: [],
        done: [],
      },
      projectId: Cookies.get('projectId'),
    },
  };
});

Mock.mock(RegExp(`${api}/storys/edit/` + '.*'), 'post', function (options) {
  return {
    code: 0,
    data: {
      ...JSON.parse(options.body),
    },
  };
});

Mock.mock(RegExp(`${api}/tasks/edit/` + '.*'), 'post', function (options) {
  return {
    code: 0,
    data: {
      ...JSON.parse(options.body),
    },
  };
});

Mock.mock(`${api}/test`, 'get', {
  code: 1,
  msg: '请求返回的非正常信息',
});
