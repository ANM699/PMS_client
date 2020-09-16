import React, { Component } from 'react';
import { Card, Table, Form, DatePicker, Modal, Progress } from 'antd';
import { Link } from 'react-router-dom';
import { ProjectOutlined, PlusCircleFilled } from '@ant-design/icons';

import TaskProgress from '../../../components/task-progress/task-progress';

const { Column } = Table;

export default class Story extends Component {
  state = {
    visible: false,
    stories: [
      {
        _id: '1232312313',
        role: '用户用户用户用户',
        activity:
          '打开首页选择标签打开首页选择标签打开首页选择标签打开首页选择标签',
        businessValue: '分析用户画像分析用户画像分析用户画像分析用户画像',
        tasks: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    ],
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Card
          title="项目需求"
          extra={
            <a onClick={this.showModal}>
              <PlusCircleFilled style={{ fontSize: '32px' }} />
            </a>
          }
        >
          <Table
            dataSource={this.state.stories}
            pagination={false}
            showHeader={false}
            rowKey="_id"
          >
            <Column title="角色" dataIndex="role" key="role" />
            <Column title="行为" dataIndex="activity" key="activity" />
            <Column
              title="目的"
              dataIndex="businessValue"
              key="businessValue"
              progress
            />
            <Column
              title="进度"
              key="progress"
              render={() => <TaskProgress todo={3} doing={5} done={4} />}
            />
            <Column
              title="查看任务"
              key="tasks"
              render={() => (
                <Link to="/project/board">
                  <ProjectOutlined />
                </Link>
              )}
            />
          </Table>
        </Card>

        <Modal
          title="新增需求"
          width={480}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        ></Modal>
      </div>
    );
  }
}
