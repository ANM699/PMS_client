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
