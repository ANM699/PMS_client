import React, { Component } from "react";
import { Avatar, Card, Tag, Space, Table, Popconfirm } from "antd";
import {
  UserOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import MemberModal from "../../../components/member/modal";
import { reqMemberList, reqUserList } from "../../../api/index";

const roleOptions = [
  {
    color: "#f56a00",
    name: "项目经理",
  },
  {
    color: "#7265e6",
    name: "前端开发",
  },
  {
    color: "#00a2ae",
    name: "后端开发",
  },
  {
    color: "#ffbf00",
    name: "UI设计",
  },
];

export default class Member extends Component {
  state = {
    users: [],
    members: [],
    visible: false,
  };
  columns = [
    {
      title: "成员",
      dataIndex: "username",
      render: (text, record) => (
        <Space>
          <Avatar
            style={{ backgroundColor: record.avatar }}
            icon={<UserOutlined />}
          ></Avatar>
          <a>{text}</a>
        </Space>
      ),
    },
    {
      title: "邮箱",
      dataIndex: "email",
      render: (text) => <div style={{ color: "rgba(0,0,0,.45)" }}>{text}</div>,
    },
    {
      title: "角色",
      dataIndex: "roles",
      render: (roles) =>
        roles.map((role, index) => (
          <Tag key={index} color={role.color}>
            {role.name}
          </Tag>
        )),
    },
    {
      title: "操作",
      dataIndex: "_id",
      key: "action",
      render: (_id) => (
        <Popconfirm
          placement="left"
          title="确认删除该成员？"
          onConfirm={() => this.handleDel(_id)}
          okText="确认"
          cancelText="取消"
        >
          <a key="delete">
            <DeleteOutlined />
          </a>
        </Popconfirm>
      ),
    },
  ];

  handleDel = (id) => {
    const members = this.state.members.filter((member) => member._id !== id);
    this.setState({ members });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (values) => {
    const user = this.state.users.find((user) => user._id === values._id);
    const users = this.state.users.filter((user) => user._id !== values._id);
    const roles = roleOptions.filter((role) => {
      return values.roles.findIndex((value) => role.name === value) !== -1;
    });
    const newMember = {
      ...user,
      roles,
    };
    const members = [newMember, ...this.state.members];
    this.setState({
      members,
      users,
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    reqMemberList().then((res) => {
      const result = res.data;
      if (result.code === 0) {
        const members = result.data;
        this.setState({
          members,
        });
      }
    });

    //获取所有用户列表（添加用户时用）
    reqUserList().then((res) => {
      const result = res.data;
      if (result.code === 0) {
        const users = result.data;
        this.setState({
          users,
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Card
          title="项目成员"
          extra={
            <a onClick={this.showModal}>
              <PlusCircleOutlined style={{ fontSize: "24px" }} />
            </a>
          }
        >
          <Table
            showHeader={false}
            pagination={false}
            rowKey="_id"
            columns={this.columns}
            dataSource={this.state.members}
          />
        </Card>
        <MemberModal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          member={null}
          users={this.state.users}
          roles={roleOptions}
        ></MemberModal>
      </div>
    );
  }
}
