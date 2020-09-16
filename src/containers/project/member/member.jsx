import React, { Component } from 'react';
import {
  Avatar,
  Card,
  Tag,
  Space,
  Table,
  Popconfirm,
  Modal,
  Button,
} from 'antd';
import {
  UserOutlined,
  DeleteOutlined,
  PlusCircleFilled,
} from '@ant-design/icons';

import MemberForm from '../../../components/member/form';
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

export default class Member extends Component {
  state = {
    users: [],
    members: [],
    visible: false,
  };
  columns = [
    {
      title: '成员',
      dataIndex: 'username',
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
      title: '邮箱',
      dataIndex: 'email',
      render: (text) => <div style={{ color: 'rgba(0,0,0,.45)' }}>{text}</div>,
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

  handleOk = (e) => {
    this.form
      .validateFields()
      .then((value) => {
        const user = this.state.users.find((user) => user._id === value._id);
        const users = this.state.users.filter((user) => user._id !== value._id);
        const roles = roleOptions.filter((role) => {
          return value.roles.findIndex((value) => role.name === value) !== -1;
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
        this.form.resetFields();
      })
      .catch((info) => {
        console.log('验证失败：', info);
      });
  };

  handleCancel = (e) => {
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
              <PlusCircleFilled style={{ fontSize: '32px' }} />
            </a>
          }
        >
          {/* <Button
            type="dashed"
            style={{
              width: '100%',
              marginBottom: 8,
            }}
            onClick={this.showModal}
          >
            <PlusOutlined />
            添加成员
          </Button> */}
          <Table
            showHeader={false}
            pagination={false}
            rowKey="_id"
            columns={this.columns}
            dataSource={this.state.members}
          />
        </Card>

        <Modal
          title="添加成员"
          width={640}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <MemberForm
            formRef={(el) => (this.form = el)}
            data={this.state.users}
            roles={roleOptions}
          ></MemberForm>
        </Modal>
      </div>
    );
  }
}
