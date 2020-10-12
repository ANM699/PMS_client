import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  TeamOutlined,
  ProjectOutlined,
  UserOutlined,
  CarryOutOutlined,
  SolutionOutlined,
  ProfileOutlined,
  SnippetsOutlined,
  BugOutlined,
} from '@ant-design/icons';

import styles from './sider.module.less';

const menuList = [
  // 包含所有导航组件的相关信息数据
  {
    path: '/project/profile',
    title: '项目状态',
    icon: <ProfileOutlined />,
  },
  {
    path: '/project/member',
    title: '成员管理',
    icon: <TeamOutlined />,
  },
  {
    path: '/project/story',
    title: '需求分析',
    icon: <SolutionOutlined />,
  },
  {
    path: '/project/sprint',
    title: '阶段设置',
    icon: <CarryOutOutlined />,
  },
  {
    path: '/project/board',
    title: '任务看板',
    icon: <ProjectOutlined />,
  },
  {
    path: '/project/meeting',
    title: '会议纪要',
    icon: <SnippetsOutlined />,
  },
  {
    path: '/account',
    title: '个人中心',
    icon: <UserOutlined />,
  },
  {
    path: '/test',
    title: '功能测试',
    icon: <BugOutlined />,
  },
];

const Sider = (props) => {
  const visiable = props.visiable;
  const currentPath = props.location.pathname;
  let selectedMenu = menuList
    .findIndex((menu) => new RegExp(menu.path).test(currentPath))
    .toString();
  // if (!visiable) return null;
  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      className={styles.sider}
      style={{
        display: visiable ? '' : 'none',
      }}
    >
      <div className={styles.logo}>PMS</div>
      <Menu theme="dark" mode="inline" selectedKeys={[selectedMenu]}>
        {menuList.map((menu, index) => (
          <Menu.Item
            key={index}
            icon={menu.icon}
            onClick={() => {
              if (menu.path) props.history.replace(menu.path);
            }}
          >
            {menu.title}
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  );
};

Sider.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};

//向外暴露withRouter()包装产生的组件，在非路由组件中使用路由库的API
//内部会向组件中传入一些路由组件特有的属性：history/location/math
export default withRouter(Sider);
