import React, { useState, useEffect } from 'react';
import List from '../../../components/task/list';
import Modal from '../../../components/task/edit-modal';
import { reqMemberList, reqEditTask } from '../../../api/index';
export default function Task(props) {
  const [visible, setVisible] = useState(false);
  const [task, setTask] = useState({ users: [] });
  const [users, setUsers] = useState([]);
  const [data, setData] = useState();
  function showModal(task) {
    setVisible(true);
    setTask(task);
  }

  function handleCancel() {
    setVisible(false);
  }

  function handleOk(values) {
    values.startDate = values.startDate
      ? values.startDate.format('YYYY-MM-DD')
      : null;
    values.endDate = values.endDate
      ? values.endDate.format('YYYY-MM-DD')
      : null;
    values.users = users.filter(
      (user) => values.selectedUsers.indexOf(user._id) !== -1
    );
    const _id = task._id;
    reqEditTask({ ...task, ...values }).then((res) => {
      const result = res.data;
      if (result.code === 0) {
        const taskList = data.map((task) =>
          task._id === _id ? result.data : task
        );
        props.updateTasks(taskList);
        setVisible(false);
      }
    });
  }

  useEffect(() => {
    if (users.length === 0) {
      reqMemberList().then((res) => {
        const result = res.data;
        if (result.code === 0) {
          setUsers(result.data);
        }
      });
    }
  });

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <>
      <List {...props} data={data} onItemEditClick={showModal}></List>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        task={task}
        users={[...task.users, ...users]}
      ></Modal>
    </>
  );
}
