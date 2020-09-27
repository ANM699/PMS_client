import Cookies from 'js-cookie';
export function getRedirectTo() {
  const projectId = Cookies.get('projectId');
  return projectId ? '/project/profile' : '/';
}

export function sortTasks(tasks) {
  let sortedTasks = {
    todo: [],
    doing: [],
    done: [],
  };
  if (Array.isArray(tasks)) {
    tasks.forEach((task) => {
      sortedTasks[task.status].push(task);
    });
  }
  return sortedTasks;
}

export const status = {
  todo: {
    color: '#4a9ff9',
    display: '未开始',
  },
  doing: {
    color: '#f9944a',
    display: '进行中',
  },
  done: {
    color: '#2ac06d',
    display: '已完成',
  },
};
