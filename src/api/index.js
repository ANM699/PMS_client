import ajax from "./ajax";

export const reqLogin = ({ username, password }) => {
  return ajax("/users/login", { username, password }, "POST");
};

export const reqRegister = ({ username, password }) => {
  return ajax("/users/register", { username, password }, "POST");
};

export const reqUser = () => {
  return ajax("/users/user");
};

//获取所有注册用户列表
export const reqUserList = () => {
  return ajax("/users/list");
};

//新增项目
export const reqCreateProject = ({
  projectName,
  startDate,
  endDate,
  description,
}) => {
  return ajax(
    "/projects/create",
    { projectName, startDate, endDate, description },
    "POST"
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
    "POST"
  );
};

//获取项目信息
export const reqProject = () => {
  return ajax("/projects/project");
};

//获取项目列表
export const reqProjectList = () => {
  return ajax("/projects/list");
};

//根据projectId获取任务列表
export const reqTaskList = () => {
  return ajax("/tasks/list");
};

//根据projectId获取成员列表
export const reqMemberList = () => {
  return ajax("/projects/members");
};

//根据projectId获取冲刺周期列表list
export const reqSprintList = () => {
  return ajax("/sprints/list");
};
//新增冲刺周期
export const reqCreateSprint = ({ startDate, endDate }) => {
  return ajax("/sprints/create", { startDate, endDate }, "POST");
};
