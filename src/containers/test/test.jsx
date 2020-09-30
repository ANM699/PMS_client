import React, { Component } from 'react';
import { Button } from 'antd';
import { testMessage } from '../../api/index';

export default class Test extends Component {
  handleClick = () => {
    testMessage();
  };

  render() {
    return <Button onClick={this.handleClick}>测试请求拦截（全局消息）</Button>;
  }
}
