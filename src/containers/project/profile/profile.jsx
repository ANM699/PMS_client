import React, { Component } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import moment from 'moment';
import { TeamOutlined } from '@ant-design/icons';

import TaskProgress from '../../../components/task-progress/task-progress';

var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');

const { Countdown } = Statistic;

const option = {
  title: {
    text: '燃尽图',
  },
  legend: {
    data: ['剩余任务'],
    selectedMode: false,
    top: 10,
  },
  grid: {
    left: '1%',
    right: '1%',
    bottom: '1%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'cross',
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [
      '09-17',
      '09-18',
      '09-19',
      '09-20',
      '09-21',
      '09-22',
      '09-23',
      '09-24',
      '09-25',
      '09-26',
      '09-27',
      '09-28',
      '09-29',
    ],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '剩余任务',
      data: [56, 50, 55, 48, 40, 30, 24, 22, 15, 11, 8, 3, 2, 1],
      type: 'line',
      areaStyle: {},
    },
    {
      data: [
        ['09-17', 56],
        ['09-29', 0],
      ],
      type: 'line',
      lineStyle: {
        type: 'dashed',
      },
    },
  ],
};

export default class Profile extends Component {
  componentDidMount() {
    setTimeout(() => {
      const chart = echarts.init(this.chart, 'light');
      chart.setOption(option);
      chart.on('finished', () => {
        chart.resize();
      });
    }, 0);

    // const chart = echarts.init(this.chart);
    // chart.setOption(option);
  }

  render() {
    return (
      // <>
      //   <div>
      //     当前处于第2个周期(2020-9-13~2020-10-10)，该周期共有任务30个，其中3个任务为上个周期遗留。
      //   </div>
      //   <div>目前未开始10个，进行中10个，已结束10个。</div>
      // </>
      <div>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card
              hoverable
              onClick={() => {
                this.props.history.replace('/project/sprint');
              }}
            >
              <Countdown
                title="距离阶段结束"
                value={moment('2020-10-12')}
                format="D 天 H 时"
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              onClick={() => {
                this.props.history.replace('/project/board');
              }}
            >
              <Statistic title="阶段任务" value={56} />
              {/* <TaskProgress todo={10} doing={39} done={7}></TaskProgress> */}
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              onClick={() => {
                this.props.history.replace('/project/member');
              }}
            >
              <Statistic
                title="项目成员"
                value={13}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <div
                ref={(el) => {
                  this.chart = el;
                }}
                style={{
                  width: '100%',
                  height: '400px',
                }}
              ></div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
