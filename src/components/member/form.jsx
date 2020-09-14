import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

export default function MemberForm(props) {
  return (
    <Form
      ref={props.formRef}
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 16,
      }}
    >
      <Form.Item
        name="_id"
        label="项目成员"
        rules={[
          {
            required: true,
            message: '请选择项目成员！',
          },
        ]}
      >
        <Select
          showSearch
          placeholder="选择成员"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {props.data.map((user, index) => (
            <Option key={index} value={user._id}>
              {user.username}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="roles"
        label="成员角色"
        rules={[
          {
            required: true,
            message: '请选择成员角色！',
          },
        ]}
      >
        <Select mode="multiple" allowClear placeholder="选择角色">
          {props.roles.map((role, index) => (
            <Option key={index} value={role.name}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
