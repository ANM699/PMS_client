import React from 'react';
import { Table, Avatar, Tooltip, Tag } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';

const { Column } = Table;

export default function List(props) {
  const {
    data,
    status,
    size = 'default',
    onItemEditClick,
    editable = true,
  } = props;

  return (
    <Table dataSource={data} pagination={false} rowKey="_id" size={size}>
      <Column
        width="90px"
        title="状态"
        dataIndex="status"
        key="status"
        render={(value) => {
          const p = status[value];
          return <Tag color={p.color}>{p.display}</Tag>;
        }}
      />
      <Column title="内容" dataIndex="content" key="content" />
      <Column
        title="参与者"
        dataIndex="users"
        key="users"
        render={(users) => (
          <Avatar.Group>
            {users.map((user) => (
              <Tooltip key={user._id} title={user.username} placement="top">
                <Avatar
                  style={{ backgroundColor: user.avatar }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
            ))}
          </Avatar.Group>
        )}
      />
      <Column title="创建日期" dataIndex="createDate" />
      <Column title="开始日期" dataIndex="startDate" />
      <Column title="完成日期" dataIndex="endDate" />
      {editable ? (
        <Column
          title="操作"
          dataIndex="_id"
          key="action"
          render={(_id, record) => (
            <a
              onClick={(e) => {
                e.preventDefault();
                onItemEditClick(record);
              }}
            >
              <EditOutlined />
            </a>
          )}
        />
      ) : null}
    </Table>
  );
}
