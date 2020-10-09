import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import moment from 'moment';

export default function TaskModal({ visible, onOk, onCancel }) {
  const [form] = Form.useForm();
  //   useEffect(() => {
  //     form.resetFields();
  //   });

  return (
    <Modal
      forceRender
      title="新增任务"
      width={640}
      visible={visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onOk(values);
            form.resetFields();
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
        initialValues={{ createDate: moment() }}
        form={form}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
        <Form.Item
          name="content"
          label="任务内容"
          rules={[
            {
              required: true,
              message: '请输入至少五个字符的任务内容！',
              min: 5,
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="请输入至少五个字符" />
        </Form.Item>
        <Form.Item name="createDate" label="创建日期">
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
}
