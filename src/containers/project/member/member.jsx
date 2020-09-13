import React, { Component } from "react";
import { Avatar, Card, Tag, Space, Table, Modal } from "antd";
import {
  UserOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { reqMemberList } from "../../../api/index";

export default class Member extends Component {
  state = {
    members: [],
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
          {/* <div> */}
          <a>{text}</a>
          {/* <div style={{ color: "rgba(0,0,0,.45)" }}>{record.email}</div> */}
          {/* </div> */}
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
        <a
          onClick={() => {
            this.handleDel(_id);
          }}
        >
          <DeleteOutlined />
        </a>
      ),
    },
  ];

  handleDel = (id) => {
    var that = this;
    Modal.confirm({
      title: "确认删除该成员吗？",
      icon: <ExclamationCircleOutlined />,
      cancelText: "取消",
      okText: "确定",
      onOk() {
        const members = that.state.members.filter((member) => member._id != id);
        that.setState({ members });
      },
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
  }
  render() {
    return (
      <Card>
        <Table
          showHeader={false}
          pagination={false}
          rowKey="_id"
          columns={this.columns}
          dataSource={this.state.members}
        />
      </Card>

      // <Card>
      //   <List
      //     itemLayout="horizontal"
      //     dataSource={this.state.members}
      //     renderItem={(item) => (
      //       <List.Item
      //         actions={[
      //           <a onClick={this.handleDel}>
      //             <DeleteOutlined />
      //           </a>,
      //         ]}
      //       >
      //         <List.Item.Meta
      //           avatar={
      //             <Avatar
      //               style={{ backgroundColor: item.avatar }}
      //               icon={<UserOutlined />}
      //             />
      //           }
      //           title={<a>{item.username}</a>}
      //           description={item.email}
      //         />
      //         {item.roles.map((role, index) => (
      //           <Tag key={index} color={role.color}>
      //             {role.name}
      //           </Tag>
      //         ))}
      //       </List.Item>
      //     )}
      //   />
      // </Card>
    );
  }
}
