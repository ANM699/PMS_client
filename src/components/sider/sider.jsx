import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import './sider.less';

class Sider extends Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        className="sider"
      >
        <div className="logo">PMS</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
            onClick={() => {
              this.props.history.replace('/project/list');
            }}
          >
            项目列表
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<VideoCameraOutlined />}
            onClick={() => {
              this.props.history.replace('/project/profile');
            }}
          >
            项目信息&状态
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            项目阶段（冲刺周期列表）
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            项目需求（用户故事，产品订单）
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />}>
            项目成员
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />}>
            会议纪要
          </Menu.Item>
          <Menu.Item key="6" icon={<UserOutlined />}>
            燃尽图&看板
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    );
  }
}

//向外暴露withRouter()包装产生的组件，在非路由组件中使用路由库的API
//内部会向组件中传入一些路由组件特有的属性：history/location/math
export default withRouter(Sider);
