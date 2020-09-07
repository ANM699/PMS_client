const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: '倒垃圾' },
    'task-2': { id: 'task-2', content: '看剧' },
    'task-3': { id: 'task-3', content: '给手机充电' },
    'task-4': { id: 'task-4', content: '做晚饭' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'TODO',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1'],
};

export default initialData;
