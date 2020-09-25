import React, { Component } from "react";
import { Card, Descriptions } from "antd";

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
            装林步车转体领角认分办为心这因。合般形象者劳斯知管以北拉领到治。示油节走不教反回生去车之热作。
            <br />
            她定感认后率民作军里单由办眼平。书强革电式每科去同政形准红实。
            <br />
            成们只进华王第规情党圆中前群半自。林达空矿真亲分他话间白华。
          </Descriptions.Item>
          <Descriptions.Item label="待办事项">
            己自美素领段然得示包水济确张何只。由什世向水年北开亲南交就治造。
            <br />
            团影光将料受打阶图层志且小被器。生满委物更门称式上及界往派式东向思。
            <br />
            节复导应设改八干万期直通成数江。子一二打知拉子实料结越团论等科需展。
          </Descriptions.Item>
        </Descriptions>
      </Card>
    );
  }
}
