import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout, Modal } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';

import './main.less';

import Sider from '../../components/sider/sider';
import MyProjects from '../my-projects/my-projects';
import ProjectProfile from '../project/profile/profile';
import NotFound from '../exception/not-found';
import {
  resetUser,
  resetProject,
  getProject,
  getUser,
} from '../../redux/actions';

const { Header, Content } = Layout;

class Main extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logout = () => {
    let that = this;
    Modal.confirm({
      title: '确认退出登录吗？',
      icon: <ExclamationCircleOutlined />,
      cancelText: '取消',
      okText: '确定',
      onOk() {
        Cookies.remove('projectId');
        Cookies.remove('userId');
        that.props.resetUser();
        that.props.resetProject();
      },
    });
  };

  componentDidMount() {
    const userId = Cookies.get('userId');
    if (userId && !this.props.user._id) {
      this.props.getUser();
    }

    const projectId = Cookies.get('projectId');
    if (projectId && !this.props.project._id) {
      this.props.getProject();
    }
  }

  render() {
    const userId = Cookies.get('userId');
    // const projectId = Cookies.get('projectId');
    const visiable = this.props.location.pathname === '/' ? false : true;
    if (!userId) {
      return <Redirect to="/login" />;
    }

    // if (projectId && !visiable) {
    //   return <Redirect to="/project/profile" />;
    // }

    return (
      <Layout>
        <Sider visiable={visiable} collapsed={this.state.collapsed} />
        <Layout>
          <Header className="header">
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: visiable ? this.toggle : null,
              }
            )}
            <div className="title">{this.props.project.projectName}</div>
            <LogoutOutlined className="logout" onClick={this.logout} />
          </Header>
          <Content className="container">
            <Switch>
              <Route exact path="/" component={MyProjects}></Route>
              {/* <Route path="/project/list" component={ProjectList}></Route> */}
              <Route path="/project/profile" component={ProjectProfile}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  project: state.project,
});

const mapDispatchToProps = { resetUser, resetProject, getProject, getUser };

export default connect(mapStateToProps, mapDispatchToProps)(Main);
