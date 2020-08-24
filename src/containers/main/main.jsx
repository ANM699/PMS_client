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
import ProjectList from '../project/list/list';
import ProjectProfile from '../project/profile/profile';
import NotFound from '../exception/not-found';
import { resetUser } from '../../redux/actions';

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
        Cookies.remove('userid');
        that.props.resetUser();
      },
    });
  };

  render() {
    const userid = Cookies.get('userid');
    if (!userid) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout>
        <Sider collapsed={this.state.collapsed} />
        <Layout>
          <Header className="header">
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: this.toggle,
              }
            )}
            <div className="title">{this.props.project.projectName}</div>
            <LogoutOutlined className="logout" onClick={this.logout} />
          </Header>
          <Content className="contenter">
            {/* <div className="contenter"> */}
            <Switch>
              <Route exact path="/" component={ProjectList}></Route>
              {/* <Route path="/project/list" component={ProjectList}></Route> */}
              <Route path="/project/profile" component={ProjectProfile}></Route>
              <Route component={NotFound}></Route>
            </Switch>
            {/* </div> */}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user,project:state.project });

const mapDispatchToProps = { resetUser };

export default connect(mapStateToProps, mapDispatchToProps)(Main);
