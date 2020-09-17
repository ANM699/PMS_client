import React from 'react';
import { Layout, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';

import styles from './header.module.less';

const Header = (props) => {
  return (
    <Layout.Header className={styles.header}>
      {props.visiable &&
        React.createElement(
          props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: styles.trigger,
            onClick: props.toggle,
          }
        )}
      <div className={styles.title}>
        <Link to="/">{props.projectName}</Link>
      </div>
      <div>
        <Avatar
          style={{ backgroundColor: '#00a2ae', marginRight: 8 }}
          icon={<UserOutlined />}
        />
        {props.username}
      </div>
      <LogoutOutlined className={styles.logout} onClick={props.logout} />
    </Layout.Header>
  );
};

export default Header;
