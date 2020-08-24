import ajax from "./ajax";

export const reqLogin = ({ email, password }) => {
  return ajax("users/login", { email, password }, "POST");
};

//新增项目
export const reqCreateProject = ({
  projectName,
  startDate,
  endDate,
  description,
}) => {
  return ajax(
    "projects/create",
    { projectName, startDate, endDate, description },
    "POST"
  );
};

//获取项目列表
export const reqProjectList = () => {
  return ajax("projects/projectlist");
};
