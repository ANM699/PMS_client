import React from 'react';
import { Result } from 'antd';

export default () => (
  <Result
    status="404"
    title="404"
    style={{
      background: 'none',
    }}
    subTitle="页面不存在"
  />
);
