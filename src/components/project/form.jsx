import React, { useEffect } from 'react';
import { Form, Input, DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

export default function ProjectForm(props) {
  const [form] = Form.useForm();
  const current = props.current;
  const rangeDate = [moment(current.startDate), moment(current.endDate)];
  useEffect(() => {
    if (current) {
      form.setFieldsValue({ ...current, rangeDate });
    } else {
      form.resetFields();
    }
  }, [props.current]);

  return (
    <Form
      form={form}
      ref={props.formRef}
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
            message: '请选择选择项目时间！',
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
  );
}
