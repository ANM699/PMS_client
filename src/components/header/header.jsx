import React from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import './header.less';

const Header = (props) => {
  return (
    <Layout.Header className="header">
      {React.createElement(
        props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: 'trigger',
          onClick: props.toggle,
        }
      )}
      <div className="title">{props.projectName}</div>
      <LogoutOutlined className="logout" onClick={props.logout} />
    </Layout.Header>
  );
};

export default Header;
