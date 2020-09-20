import React from "react";
import { Table } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Column } = Table;

export default function ProjectList(props) {
  const data = props.data;
  return (
    <Table dataSource={data} pagination={false} showHeader={false} rowKey="_id">
      <Column
        title="信息"
        dataIndex="projectName"
        key="projectName"
        render={(value, record) => (
          <>
            <h4>
              <a onClick={() => props.onConfirm(record)}>{value}</a>
            </h4>
            <div style={{ color: "rgba(0,0,0,.45)", marginTop: "4px" }}>
              {record.description}
            </div>
          </>
        )}
      />
      <Column
        title="时间"
        key="date"
        render={(value, record) => `${record.startDate}~${record.endDate}`}
      />
      <Column
        title="操作"
        dataIndex="_id"
        key="action"
        render={(_id, record) => (
          <a
            onClick={(e) => {
              e.preventDefault();
              props.onItemEditClick(record);
            }}
          >
            <EditOutlined />
          </a>
        )}
      />
    </Table>
  );
}
