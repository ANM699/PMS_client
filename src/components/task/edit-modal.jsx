import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Radio,
  Select,
  Avatar,
  Space,
} from 'antd';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function StoryModal({ visible, onOk, onCancel, task, users }) {
  const [status, setStatus] = useState();
  const [form] = Form.useForm();
  useEffect(() => {
    if (task) {
      setStatus(task.status);
      const startDate = task.startDate ? moment(task.startDate) : moment();
      const endDate = task.endDate ? moment(task.endDate) : moment();
      const selectedUsers = task.users.map((user) => user._id);
      form.setFieldsValue({
        ...task,
        selectedUsers,
        startDate,
        endDate,
      });
    } else {
      form.resetFields();
    }
  }, [task]);

  function handleChange(e) {
    setStatus(e.target.value);
  }

  return (
    <Modal
      forceRender
      title="编辑任务"
      width={640}
      visible={visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onOk(values);
          })
          .catch((info) => {
            console.log('验证失败：', info);
          });
      }}
      onCancel={onCancel}
      okText="确定"
      cancelText="取消"
    >
      <Form
        form={form}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
        <Form.Item
          name="selectedUsers"
          label="参与者"
          rules={[
            {
              required: true,
              message: '请选择参与者！',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="选择参与者"
            optionFilterProp="title"
            optionLabelProp="title"
            mode="multiple"
          >
            {users.map((user, index) => (
              <Option key={index} value={user._id} title={user.username}>
                <Space>
                  <Avatar
                    style={{ backgroundColor: user.avatar }}
                    icon={<UserOutlined />}
                  ></Avatar>
                  <div>
                    <a> {user.username}</a>
                    <div style={{ color: 'rgba(0,0,0,.45)' }}>{user.email}</div>
                  </div>
                </Space>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="status" label="状态">
          <Radio.Group name="radiogroup" onChange={handleChange}>
            <Radio value="todo">未开始</Radio>
            <Radio value="doing">进行中</Radio>
            <Radio value="done">已完成</Radio>
          </Radio.Group>
        </Form.Item>

        {status !== 'todo' ? (
          <Form.Item
            name="startDate"
            label="开始日期"
            rules={[
              {
                required: true,
                message: '请选择开始日期！',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
        ) : null}
        {status === 'done' ? (
          <Form.Item
            name="endDate"
            label="完成日期"
            rules={[
              {
                required: true,
                message: '请选择完成日期！',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
        ) : null}
      </Form>
    </Modal>
  );
}
