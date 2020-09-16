import React, { Component } from "react";
import { Card, Table, Form, DatePicker, Modal, Progress, Tag } from "antd";
import { Link } from "react-router-dom";
import { ProjectOutlined, PlusCircleFilled } from "@ant-design/icons";

import TaskProgress from "../../../components/task-progress/task-progress";

const { Column } = Table;

const priority = [
  {
    color: "#2ac06d",
    display: "低",
  },
  {
    color: "#f9944a",
    display: "中",
  },
  {
    color: "#ff4d4f",
    display: "高",
  },
];

export default class Story extends Component {
  state = {
    visible: false,
    stories: [
      {
        _id: "1232312313",
        role: "用户",
        activity: "选择首页弹出的标签",
        date: "2010-1-1",
        priority: 2,
        businessValue: "分析用户画像，智能推荐分析用户画像，智能推荐",
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
              <PlusCircleFilled style={{ fontSize: "32px" }} />
            </a>
          }
        >
          <Table
            dataSource={this.state.stories}
            pagination={false}
            rowKey="_id"
          >
            <Column
              title="优先级"
              dataIndex="priority"
              key="priority"
              render={(value) => {
                const p = priority[value];
                return (
                  <Tag
                    style={{ width: "40px", textAlign: "center" }}
                    color={p.color}
                  >
                    {p.display}
                  </Tag>
                );
              }}
            />
            <Column title="提出日期" dataIndex="date" key="date" />
            <Column title="角色" dataIndex="role" key="role" />
            <Column title="行为" dataIndex="activity" key="activity" />
            <Column
              title="目的"
              dataIndex="businessValue"
              key="businessValue"
              progress
            />

            <Column
              title="任务进度"
              key="progress"
              render={() => <TaskProgress todo={3} doing={5} done={4} />}
            />
            <Column
              title="查看详情"
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
