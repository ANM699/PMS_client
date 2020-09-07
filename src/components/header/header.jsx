import React from "react";
import { Layout, Avatar } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

import styles from "./header.module.less";

const Header = (props) => {
  return (
    <Layout.Header className={styles.header}>
      {React.createElement(
        props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: styles.trigger,
          onClick: props.toggle,
        }
      )}
      <div className={styles.title}>{props.projectName}</div>
      <div>
        <Avatar
          style={{ backgroundColor: "#00a2ae", marginRight: 8 }}
          icon={<UserOutlined />}
        />
        {props.username}
      </div>
      <LogoutOutlined className={styles.logout} onClick={props.logout} />
    </Layout.Header>
  );
};

export default Header;
