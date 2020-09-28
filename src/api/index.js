import ajax from './ajax';

export const reqLogin = ({ username, password }) => {
  return ajax('/users/login', { username, password }, 'POST');
};

export const reqRegister = ({ username, password }) => {
  return ajax('/users/register', { username, password }, 'POST');
};

export const reqUser = () => {
  return ajax('/users/user');
};

//获取所有注册用户列表
export const reqUserList = () => {
  return ajax('/users/list');
};

//新增项目
export const reqCreateProject = ({
  projectName,
  startDate,
  endDate,
  description,
}) => {
  return ajax(
    '/projects/create',
    { projectName, startDate, endDate, description },
    'POST'
  );
};

//编辑项目
export const reqEditProject = ({
  _id,
  projectName,
  startDate,
  endDate,
  description,
}) => {
  return ajax(
    `/projects/edit/${_id}`,
    { _id, projectName, startDate, endDate, description },
    'POST'
  );
};

//获取项目信息
export const reqProject = () => {
  return ajax('/projects/project');
};

//获取项目列表
export const reqProjectList = () => {
  return ajax('/projects/list');
};

//根据projectId获取阶段下或者用户故事下的任务列表
export const reqTaskList = (params) => {
  return ajax('/tasks/list', params);
};

//根据projectId获取成员列表
export const reqMemberList = () => {
  return ajax('/projects/members');
};

//根据projectId获取冲刺周期列表
export const reqSprintList = () => {
  return ajax('/sprints/list');
};
//新增冲刺周期
export const reqCreateSprint = ({ startDate, endDate }) => {
  return ajax('/sprints/create', { startDate, endDate }, 'POST');
};

//根据projectId获取用户故事列表
export const reqStoryList = () => {
  return ajax('/stories/list');
};

//根据projectId获取任务列表
// export const reqTaskList = () => {
//   return ajax('/tasks/list');
// };

//新增任务
export const reqCreateTask = ({
  content,
  createDate,
  status = 'todo',
  users = [],
}) => {
  return ajax('/tasks/create', { content, createDate, status, users }, 'POST');
};

//新增用户故事
export const reqCreateStory = ({
  role,
  activity,
  priority,
  businessValue,
  date,
}) => {
  return ajax(
    '/storys/create',
    { role, activity, priority, businessValue, date },
    'POST'
  );
};

//编辑用户故事
export const reqEditStory = ({
  _id,
  role,
  activity,
  priority,
  businessValue,
  date,
}) => {
  return ajax(
    `/storys/edit/${_id}`,
    { _id, role, activity, priority, businessValue, date },
    'POST'
  );
};
