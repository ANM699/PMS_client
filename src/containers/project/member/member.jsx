import React, { Component, useState, useEffect } from 'react';
import { Avatar, Card, Tag, Space, Table, Popconfirm } from 'antd';
import {
  UserOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import MemberModal from '../../../components/member/modal';
import { reqMemberList, reqUserList } from '../../../api/index';

const roleOptions = [
  {
    color: '#f56a00',
    name: '项目经理',
  },
  {
    color: '#7265e6',
    name: '前端开发',
  },
  {
    color: '#00a2ae',
    name: '后端开发',
  },
  {
    color: '#ffbf00',
    name: 'UI设计',
  },
];

export default function Member() {
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    reqMemberList().then((res) => {
      const result = res.data;
      if (result.code === 0) {
        setMembers(result.data);
      }
    });

    //获取所有用户列表（添加用户时用）
    reqUserList().then((res) => {
      const result = res.data;
      if (result.code === 0) {
        setUsers(result.data);
      }
    });
  }, []);

  const handleDel = (id) => {
    const newMembers = members.filter((member) => member._id !== id);
    setMembers(newMembers);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (values) => {
    const user = users.find((user) => user._id === values._id);
    const users = users.filter((user) => user._id !== values._id);
    const roles = roleOptions.filter((role) => {
      return values.roles.findIndex((value) => role.name === value) !== -1;
    });
    const newMember = {
      ...user,
      roles,
    };
    const members = [newMember, ...members];
    setMembers(members);
    setUsers(users);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: '成员',
      dataIndex: 'username',
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
      title: '邮箱',
      dataIndex: 'email',
      render: (text) => (
        <span style={{ color: 'rgba(0,0,0,.45)' }}>{text}</span>
      ),
    },
    {
      title: '角色',
      dataIndex: 'roles',
      render: (roles) =>
        roles.map((role, index) => (
          <Tag key={index} color={role.color}>
            {role.name}
          </Tag>
        )),
    },
    {
      title: '操作',
      dataIndex: '_id',
      key: 'action',
      render: (_id) => (
        <Popconfirm
          placement="left"
          title="确认删除该成员？"
          onConfirm={() => handleDel(_id)}
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

  return (
    <div>
      <Card
        title="项目成员"
        extra={
          <a onClick={showModal}>
            <PlusCircleOutlined style={{ fontSize: '24px' }} />
          </a>
        }
      >
        <Table
          showHeader={false}
          pagination={false}
          rowKey="_id"
          columns={columns}
          dataSource={members}
        />
      </Card>
      <MemberModal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        member={null}
        users={users}
        roles={roleOptions}
      ></MemberModal>
    </div>
  );
}
