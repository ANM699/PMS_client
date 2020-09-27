import React, { useEffect } from 'react';
import { Form, Input, DatePicker, Modal } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

export default function ProjectModal({ visible, onOk, onCancel, project }) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (project) {
      const rangeDate = [moment(project.startDate), moment(project.endDate)];
      form.setFieldsValue({ ...project, rangeDate });
    } else {
      form.resetFields();
    }
  });

  return (
    <Modal
      forceRender
      title={project ? '编辑项目' : '创建项目'}
      width={640}
      visible={visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onOk(values);
            // form.resetFields();
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
          name="projectName"
          label="项目名称"
          rules={[
            {
              required: true,
              message: '请输入项目名称！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="rangeDate"
          label="项目时间"
          rules={[
            {
              required: true,
              message: '请选择项目时间！',
            },
          ]}
        >
          <RangePicker
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="项目简介"
          rules={[
            {
              required: true,
              message: '请输入至少五个字符的项目简介！',
              min: 5,
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="请输入至少五个字符" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
