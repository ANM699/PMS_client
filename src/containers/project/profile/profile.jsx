import React, { Component } from 'react';

export default class Profile extends Component {
  render() {
    return (
      <>
        <div>
          当前处于第2个周期(2020-9-13~2020-10-10)，该周期共有任务30个，其中3个任务为上个周期遗留。
        </div>
        <div>目前未开始10个，进行中10个，已结束10个。</div>
      </>
    );
  }
}
