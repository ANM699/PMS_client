import React from "react";
import { List, Popconfirm } from "antd";

const ProjectList = (props) => {
  const data = props.data;
  return (
    <List
      size="large"
      dataSource={data}
      renderItem={(item) => (
        <List.Item actions={[<a key="edit">编辑</a>]}>
          <List.Item.Meta
            title={
              <Popconfirm
                title="选择并切换至该项目？"
                onConfirm={() => props.onConfirm(item)}
                okText="确认"
                cancelText="取消"
              >
                <a>{item.projectName}</a>
              </Popconfirm>
            }
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};

export default ProjectList;
