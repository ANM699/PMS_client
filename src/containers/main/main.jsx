import React, { Component } from "react";
import Cookies from "js-cookie";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import Sider from "../../components/sider/sider";
import Header from "../../components/header/header";
import MyProjects from "../my-projects/my-projects";
import Board from "../project/board/board";
import ProjectProfile from "../project/profile/profile";
import NotFound from "../exception/not-found";
import { resetUser, getUser } from "../../redux/user/actions";
import { resetProject, getProject } from "../../redux/project/actions";

const { Content } = Layout;

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
      title: "确认退出登录吗？",
      icon: <ExclamationCircleOutlined />,
      cancelText: "取消",
      okText: "确定",
      onOk() {
        Cookies.remove("projectId");
        Cookies.remove("userId");
        that.props.resetUser();
        that.props.resetProject();
      },
    });
  };

  componentDidMount() {
    const userId = Cookies.get("userId");
    if (userId && !this.props.user._id) {
      this.props.getUser();
    }

    const projectId = Cookies.get("projectId");
    if (projectId && !this.props.project._id) {
      this.props.getProject();
    }
  }

  render() {
    const userId = Cookies.get("userId");
    const projectId = Cookies.get("projectId");
    const visiable =
      this.props.location.pathname === "/" && !projectId ? false : true;
    if (!userId) {
      return <Redirect to="/login" />;
    }
    if (visiable && !projectId) {
      return <Redirect to="/" />;
    }

    // const marginLeft = visiable ? (this.state.collapsed ? 80 : 200) : 0;

    return (
      <Layout
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <Sider visiable={visiable} collapsed={this.state.collapsed} />
        <Layout style={{ minHeight: "100vh" }}>
          <Header
            projectName={this.props.project.projectName}
            username={this.props.user.username}
            collapsed={this.state.collapsed}
            toggle={visiable ? this.toggle : null}
            logout={this.logout}
          />
          <Content style={{ padding: "24px", minHeight: "auto" }}>
            <Switch>
              <Route exact path="/" component={MyProjects}></Route>
              <Route path="/project/profile" component={ProjectProfile}></Route>
              <Route path="/project/board" component={Board}></Route>
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
