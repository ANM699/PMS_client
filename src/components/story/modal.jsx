import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Radio } from 'antd';
import moment from 'moment';

export default function StoryModal({ visible, onOk, onCancel, story }) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (story) {
      const date = moment(story.date);
      form.setFieldsValue({ ...story, date });
    } else {
      form.resetFields();
    }
  });

  return (
    <Modal
      forceRender
      title={story ? '编辑需求' : '新增需求'}
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
        initialValues={{ date: moment(), priority: 0 }}
        form={form}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
        <Form.Item
          name="role"
          label="角色"
          rules={[
            {
              required: true,
              message: '请输入角色！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="activity"
          label="行为"
          rules={[
            {
              required: true,
              message: '请输入至少五个字符！',
              min: 5,
            },
          ]}
        >
          <Input.TextArea rows={2} placeholder="请输入至少五个字符" />
        </Form.Item>
        <Form.Item
          name="businessValue"
          label="目的"
          rules={[
            {
              required: true,
              message: '请输入至少五个字符！',
              min: 5,
            },
          ]}
        >
          <Input.TextArea rows={2} placeholder="请输入至少五个字符" />
        </Form.Item>
        <Form.Item
          name="date"
          label="提出日期"
          rules={[
            {
              required: true,
              message: '请选择提出日期！',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item name="priority" label="优先级">
          <Radio.Group name="radiogroup">
            <Radio value={0}>低</Radio>
            <Radio value={1}>中</Radio>
            <Radio value={2}>高</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}
