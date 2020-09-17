import React, { Component } from "react";
import { Card, Table, Form, DatePicker, Modal, Tag, Divider } from "antd";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  PlusCircleOutlined,
  ForkOutlined,
} from "@ant-design/icons";

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
              <PlusCircleOutlined style={{ fontSize: "24px" }} />
            </a>
          }
        >
          <Table
            dataSource={this.state.stories}
            pagination={false}
            rowKey="_id"
          >
            <Column
              width="80px"
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
              render={() => (
                <Link to="/project/board">
                  <TaskProgress todo={3} doing={5} done={4} />
                </Link>
              )}
            />
            <Column title="提出日期" dataIndex="date" key="date" />
            <Column
              title="操作"
              key="tasks"
              render={() => (
                <>
                  <a>
                    <EditOutlined />
                  </a>
                  <Divider type="vertical" />
                  <a>
                    <ForkOutlined />
                  </a>
                </>
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
