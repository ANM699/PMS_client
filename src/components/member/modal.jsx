import React from "react";
import { Form, Select, Modal } from "antd";

const { Option } = Select;

export default function MemberModal({
  visible,
  onOk,
  onCancel,
  member,
  users,
  roles,
}) {
  const [form] = Form.useForm();
  return (
    <Modal
      forceRender
      title={member ? "编辑成员" : "添加成员"}
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
            console.log("验证失败：", info);
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
          name="_id"
          label="项目成员"
          rules={[
            {
              required: true,
              message: "请选择项目成员！",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="选择成员"
            optionFilterProp="children"
            filterOption={(input, option) => {
              console.log(option);
              return (
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
          >
            {users.map((user, index) => (
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
              message: "请选择成员角色！",
            },
          ]}
        >
          <Select mode="multiple" allowClear placeholder="选择角色">
            {roles.map((role, index) => (
              <Option key={index} value={role.name}>
                {role.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
