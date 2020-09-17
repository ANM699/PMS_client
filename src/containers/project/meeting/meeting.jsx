import React, { Component } from 'react';
import { Card, Descriptions } from 'antd';

export default class Meeting extends Component {
  render() {
    return (
      <Card>
        <Descriptions size="middle" title="阶段例会" bordered column={2}>
          <Descriptions.Item label="会议时间">2020-09-12</Descriptions.Item>
          <Descriptions.Item label="会议地点">302</Descriptions.Item>
          <Descriptions.Item label="参会人员" span={2}>
            张三，李四，王五
          </Descriptions.Item>
          <Descriptions.Item label="会议内容" span={2}>
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication factor: 3
            <br />
            Region: East China 1
          </Descriptions.Item>
          <Descriptions.Item label="待办事项">
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication factor: 3
            <br />
            Region: East China 1
          </Descriptions.Item>
        </Descriptions>
      </Card>
    );
  }
}
