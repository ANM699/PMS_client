import React, { Component, useState, useEffect, useRef } from "react";
import { Card, Table, Form, DatePicker, Modal, Divider } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { PlusCircleOutlined, AppstoreAddOutlined } from "@ant-design/icons";

import TaskProgress from "../../../components/task-progress/task-progress";
import TaskTransfer from "../../../components/task/transfer";
import TaskList from "../task/task";
import { createSprint, getSprints } from "../../../redux/sprints/actions";
import { sortTasks, status } from "../../../utils/index";

import {
  reqTaskList,
  reqSprintList,
  reqCreateSprint,
} from "../../../api/index";

import styles from "./sprint.module.less";

const { RangePicker } = DatePicker;
const { Column } = Table;

const columns = [
  {
    dataIndex: "content",
    title: "任务",
  },
  {
    dataIndex: "createDate",
    title: "创建时间",
  },
];

const Sprint = (props) => {
  const [visible, setVisible] = useState(false);
  const [transferVisible, setTransferVisible] = useState(false);
  const [targetKeys, setTargetKeys] = useState([]);
  const [sprintList, setSprintList] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  const formRef = useRef(null);

  useEffect(() => {
    props.getSprints();
    reqSprintList().then((res) => {
      const result = res.data;
      if (result.code === 0) {
        result.data.forEach((sprint) => {
          const tasks = sprint.tasks;
          sprint.tasks = sortTasks(tasks);
        });
        setSprintList(result.data);
      }
    });
    reqTaskList().then((res) => {
      const result = res.data;
      const tasks = result.data.filter((task) => task.status === "todo");
      if (result.code === 0) {
        setTasks(tasks);
      }
    });
  }, []);

  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const showModal = () => {
    setVisible(true);
  };

  const showTransferModal = (id) => {
    setTransferVisible(true);
    setTargetKeys([]);
    setCurrentId(id);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const handleTransferCancel = (e) => {
    setTransferVisible(false);
  };

  const handleOk = (e) => {
    formRef.current
      .validateFields()
      .then((value) => {
        const rangeDate = value["rangeDate"];
        const startDate = rangeDate[0].format("YYYY-MM-DD");
        const endDate = rangeDate[1].format("YYYY-MM-DD");
        return reqCreateSprint({ startDate, endDate });
      })
      .then((res) => {
        const result = res.data;
        if (result.code === 0) {
          const newSprintList = [...sprintList, result.data];
          setVisible(false);
          setSprintList(newSprintList);
          formRef.current.resetFields();
        }
      })
      .catch((info) => {
        console.log("验证失败：", info);
      });
  };

  const handleTransferOk = () => {
    if (targetKeys.length) {
      const filterTasks = [];
      const newTasks = [];
      tasks.forEach((task) => {
        targetKeys.includes(task._id)
          ? filterTasks.push(task)
          : newTasks.push(task);
      });
      const newSprintList = sprintList.map((sprint) =>
        sprint._id === currentId
          ? {
              ...sprint,
              tasks: {
                ...sprint.tasks,
                todo: sprint.tasks.todo.concat(filterTasks),
              },
            }
          : sprint
      );
      //todo:设置task的sprintId
      setSprintList(newSprintList);
      setTasks(newTasks);
      setTransferVisible(false);
    } else {
      setTransferVisible(false);
    }
  };

  const { startDate, endDate } = props.project;
  const length = sprintList.length;
  let newStartDate = startDate;

  if (length > 0) {
    const lastEndDate = sprintList[length - 1].endDate;
    newStartDate = moment(lastEndDate).add(1, "days").format("YYYY-MM-DD");
  }

  return (
    <div>
      <Card
        title="项目阶段"
        extra={
          <a onClick={showModal}>
            <PlusCircleOutlined style={{ fontSize: "24px" }} />
          </a>
        }
      >
        <Table
          dataSource={sprintList}
          pagination={false}
          rowKey="_id"
          rowClassName={(record) => {
            return moment().isBetween(
              record.startDate,
              record.endDate,
              null,
              "[]"
            )
              ? styles.curSprint
              : null;
          }}
          expandable={{
            expandedRowRender: (record) => {
              const data = Object.values(record.tasks).flat();
              return (
                <TaskList
                  data={data}
                  status={status}
                  size="small"
                  editable={false}
                ></TaskList>
              );
            },
            rowExpandable: (record) =>
              Object.values(record.tasks).flat().length > 0,
          }}
        >
          <Column
            title="阶段周期"
            key="date"
            render={(value, record) => `${record.startDate}~${record.endDate}`}
          />
          <Column
            title="任务进度"
            dataIndex="_id"
            render={(id, record) => {
              return (
                <Link to={`/project/board/sprint/${id}`}>
                  <TaskProgress
                    todo={record.tasks.todo.length}
                    doing={record.tasks.doing.length}
                    done={record.tasks.done.length}
                  />
                </Link>
              );
            }}
          />
          <Column
            title="操作"
            dataIndex="_id"
            render={(id) => (
              <>
                {/* <Link to="/project/board">
                    <ProjectOutlined />
                  </Link>
                  <Divider type="vertical" /> */}
                <a
                  onClick={() => {
                    showTransferModal(id);
                  }}
                >
                  <AppstoreAddOutlined />
                </a>
              </>
            )}
          />
        </Table>
      </Card>

      <Modal
        title="新增阶段"
        width={480}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form ref={formRef}>
          <Form.Item
            name="rangeDate"
            rules={[
              {
                required: true,
                message: "请选择阶段时间！",
              },
            ]}
          >
            <RangePicker
              disabledDate={(currentDate) =>
                !currentDate.isBetween(newStartDate, endDate, "day", "[]")
              }
              defaultPickerValue={[moment(newStartDate)]}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
        </Form>
      </Modal>

      <TaskTransfer
        onCancel={handleTransferCancel}
        visible={transferVisible}
        dataSource={tasks}
        targetKeys={targetKeys}
        onOk={handleTransferOk}
        onChange={onChange}
        columns={columns}
      ></TaskTransfer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // projectList: state.projectList,
  project: state.project,
  sprints: state.sprints,
});

const mapDispatchToProps = { createSprint, getSprints };

export default connect(mapStateToProps, mapDispatchToProps)(Sprint);
