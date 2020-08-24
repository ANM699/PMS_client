import React from "react";
import { Form, Input, DatePicker } from "antd";

const { RangePicker } = DatePicker;

const ProjectForm = (props) => {
  return (
    <Form
      ref={props.formRef}
      labelCol={{
        span: 7,
      }}
      wrapperCol={{
        span: 13,
      }}
    >
      <Form.Item
        name="projectName"
        label="项目名称"
        rules={[
          {
            required: true,
            message: "请输入项目名称！",
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
            message: "请选择选择项目时间！",
          },
        ]}
      >
        <RangePicker
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="项目简介"
        rules={[
          {
            required: true,
            message: "请输入至少五个字符的项目简介！",
            min: 5,
          },
        ]}
      >
        <Input.TextArea rows={4} placeholder="请输入至少五个字符" />
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
