import React, { Component } from 'react';
import { Card, Table, Form, DatePicker, Modal, Divider } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { PlusCircleOutlined, AppstoreAddOutlined } from '@ant-design/icons';

import TaskProgress from '../../../components/task-progress/task-progress';
import TaskTransfer from '../../../components/task/transfer';
import { createSprint, getSprints } from '../../../redux/sprints/actions';
import { sortTasks } from '../../../utils/index';

import { reqTaskList } from '../../../api/index';

import styles from './sprint.module.less';

const { RangePicker } = DatePicker;
const { Column } = Table;

const columns = [
  {
    dataIndex: 'content',
    title: '任务',
  },
  {
    dataIndex: 'createDate',
    title: '创建时间',
  },
];

class Sprint extends Component {
  state = {
    visible: false,
    transferVisible: false,
    targetKeys: [],
    tasks: [],
  };

  onChange = (nextTargetKeys) => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  showTransferModal = () => {
    this.setState({
      transferVisible: true,
      targetKeys: [],
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleTransferCancel = (e) => {
    this.setState({
      transferVisible: false,
    });
  };

  handleOk = (e) => {
    this.form
      .validateFields()
      .then((value) => {
        const rangeDate = value['rangeDate'];
        const startDate = rangeDate[0].format('YYYY-MM-DD');
        const endDate = rangeDate[1].format('YYYY-MM-DD');
        this.props.createSprint({ startDate, endDate });
        this.setState({
          visible: false,
        });
        this.form.resetFields();
      })
      .catch((info) => {
        console.log('验证失败：', info);
      });
  };

  handleTransferOk = () => {
    const { targetKeys } = this.state;
    if (targetKeys.length) {
      const tasks = this.state.tasks.filter(
        (task) => !targetKeys.includes(task._id)
      );

      //todo:设置task的sprintId
      this.setState({ tasks, transferVisible: false });
    } else {
      this.setState({ transferVisible: false });
    }
  };

  componentDidMount() {
    this.props.getSprints();
    reqTaskList().then((res) => {
      const result = res.data;
      const tasks = result.data.filter((task) => task.status === 'todo');
      if (result.code === 0) {
        this.setState({
          tasks,
        });
      }
    });
  }

  render() {
    const { startDate, endDate } = this.props.project;

    const { targetKeys, tasks, transferVisible } = this.state;
    const sprints = this.props.sprints;
    const length = sprints.length;

    let newStartDate = startDate;

    if (length > 0) {
      const lastEndDate = sprints[length - 1].endDate;
      newStartDate = moment(lastEndDate).add(1, 'days').format('YYYY-MM-DD');
    }

    return (
      <div>
        <Card
          title="项目阶段"
          extra={
            <a onClick={this.showModal}>
              <PlusCircleOutlined style={{ fontSize: '24px' }} />
            </a>
          }
        >
          <Table
            dataSource={sprints}
            pagination={false}
            rowKey="_id"
            rowClassName={(record) => {
              return moment().isBetween(
                record.startDate,
                record.endDate,
                null,
                '[]'
              )
                ? styles.curSprint
                : null;
            }}
          >
            <Column
              title="阶段周期"
              key="date"
              render={(value, record) =>
                `${record.startDate}~${record.endDate}`
              }
            />
            <Column
              title="任务进度"
              dataIndex="_id"
              render={(id, record) => {
                const sortedTasks = sortTasks(record.tasks);

                return (
                  <Link to={`/project/board/sprint/${id}`}>
                    <TaskProgress
                      todo={sortedTasks.todo.length}
                      doing={sortedTasks.doing.length}
                      done={sortedTasks.done.length}
                    />
                  </Link>
                );
              }}
            />
            <Column
              title="操作"
              key="tasks"
              render={() => (
                <>
                  {/* <Link to="/project/board">
                    <ProjectOutlined />
                  </Link>
                  <Divider type="vertical" /> */}
                  <a onClick={this.showTransferModal}>
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
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <Form ref={(el) => (this.form = el)}>
            <Form.Item
              name="rangeDate"
              rules={[
                {
                  required: true,
                  message: '请选择阶段时间！',
                },
              ]}
            >
              <RangePicker
                disabledDate={(currentDate) =>
                  !currentDate.isBetween(newStartDate, endDate, 'day', '[]')
                }
                defaultPickerValue={[moment(newStartDate)]}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
          </Form>
        </Modal>

        <TaskTransfer
          onCancel={this.handleTransferCancel}
          visible={transferVisible}
          dataSource={tasks}
          targetKeys={targetKeys}
          onOk={this.handleTransferOk}
          onChange={this.onChange}
          columns={columns}
        ></TaskTransfer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // projectList: state.projectList,
  project: state.project,
  sprints: state.sprints,
});

const mapDispatchToProps = { createSprint, getSprints };

export default connect(mapStateToProps, mapDispatchToProps)(Sprint);
