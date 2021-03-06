import React, { useState, useEffect, Component, lazy, Suspense } from 'react';
import Cookies from 'js-cookie';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout, Modal, Spin } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import Sider from '../../components/sider/sider';
import Header from '../../components/header/header';
// import MyProjects from '../my-projects/my-projects';
// import Profile from '../project/profile/profile';
// import Meeting from '../project/meeting/meeting';
// import Board from '../project/board/board';
// import Member from '../project/member/member';
// import Story from '../project/story/story';
// import Sprint from '../project/sprint/sprint';
// import Test from '../test/test';
// import NotFound from '../exception/not-found';
import { resetUser, getUser } from '../../redux/user/actions';
import { resetProject, getProject } from '../../redux/project/actions';

//懒加载（代码分割）
const MyProjects = lazy(() => import('../my-projects/my-projects'));
const Profile = lazy(() => import('../project/profile/profile'));
const Meeting = lazy(() => import('../project/meeting/meeting'));
const Board = lazy(() => import('../project/board/board'));
const Member = lazy(() => import('../project/member/member'));
const Story = lazy(() => import('../project/story/story'));
const Sprint = lazy(() => import('../project/sprint/sprint'));
const Test = lazy(() => import('../test/test'));
const NotFound = lazy(() => import('../exception/not-found'));

const { Content } = Layout;

// class Main extends Component {
//   state = {
//     collapsed: false,
//   };

//   navList = [
//     {
//       path: '/',
//       component: MyProjects,
//       exact: true,
//     },
//     {
//       path: '/project/profile',
//       component: Profile,
//     },
//     {
//       path: '/project/member',
//       component: Member,
//     },
//     {
//       path: '/project/meeting',
//       component: Meeting,
//     },
//     {
//       path: '/project/story',
//       component: Story,
//     },
//     {
//       path: '/project/board',
//       component: Board,
//       exact: true,
//     },
//     {
//       path: '/project/board/:type/:id',
//       component: Board,
//     },
//     {
//       path: '/project/sprint',
//       component: Sprint,
//     },
//     {
//       path: '/test',
//       component: Test,
//     },
//     {
//       component: NotFound,
//     },
//   ];

//   toggle = () => {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   };

//   logout = () => {
//     let that = this;
//     Modal.confirm({
//       title: '确认退出登录吗？',
//       icon: <ExclamationCircleOutlined />,
//       cancelText: '取消',
//       okText: '确定',
//       onOk() {
//         Cookies.remove('projectId');
//         Cookies.remove('userId');
//         that.props.resetUser();
//         that.props.resetProject();
//       },
//     });
//   };

//   componentDidMount() {
//     const userId = Cookies.get('userId');
//     if (userId && !this.props.user._id) {
//       this.props.getUser();
//     }

//     const projectId = Cookies.get('projectId');
//     if (projectId && !this.props.project._id) {
//       this.props.getProject();
//     }
//   }

//   render() {
//     const userId = Cookies.get('userId');
//     const projectId = Cookies.get('projectId');
//     const visiable =
//       this.props.location.pathname === '/' && !projectId ? false : true;
//     if (!userId) {
//       return <Redirect to="/login" />;
//     }
//     if (visiable && !projectId) {
//       return <Redirect to="/" />;
//     }

//     // const marginLeft = visiable ? (this.state.collapsed ? 80 : 200) : 0;

//     return (
//       <Layout
//         style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
//       >
//         <Sider visiable={visiable} collapsed={this.state.collapsed} />
//         <Layout style={{ minHeight: '100vh' }}>
//           <Header
//             visiable={visiable}
//             projectName={this.props.project.projectName}
//             username={this.props.user.username}
//             collapsed={this.state.collapsed}
//             toggle={visiable ? this.toggle : null}
//             logout={this.logout}
//           />
//           <Content style={{ padding: '24px', minHeight: 'auto' }}>
//             <Switch>
//               {this.navList.map((nav, index) => (
//                 <Route key={index} {...nav} />
//               ))}
//             </Switch>
//           </Content>
//         </Layout>
//       </Layout>
//     );
//   }
// }

const navList = [
  {
    path: '/',
    component: MyProjects,
    exact: true,
  },
  {
    path: '/project/profile',
    component: Profile,
  },
  {
    path: '/project/member',
    component: Member,
  },
  {
    path: '/project/meeting',
    component: Meeting,
  },
  {
    path: '/project/story',
    component: Story,
  },
  {
    path: '/project/board',
    component: Board,
    exact: true,
  },
  {
    path: '/project/board/:type/:id',
    component: Board,
  },
  {
    path: '/project/sprint',
    component: Sprint,
  },
  {
    path: '/test',
    component: Test,
  },
  {
    component: NotFound,
  },
];

const Main = ({
  resetUser,
  resetProject,
  getUser,
  getProject,
  location,
  project,
  user,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const userId = Cookies.get('userId');
    if (userId && !user._id) {
      getUser();
    }

    const projectId = Cookies.get('projectId');
    if (projectId && !project._id) {
      getProject();
    }
  }, []);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    Modal.confirm({
      title: '确认退出登录吗？',
      icon: <ExclamationCircleOutlined />,
      cancelText: '取消',
      okText: '确定',
      onOk() {
        Cookies.remove('projectId');
        Cookies.remove('userId');
        resetUser();
        resetProject();
      },
    });
  };

  const userId = Cookies.get('userId');
  const projectId = Cookies.get('projectId');
  const visiable = location.pathname === '/' && !projectId ? false : true;
  if (!userId) {
    return <Redirect to="/login" />;
  }
  if (visiable && !projectId) {
    return <Redirect to="/" />;
  }

  return (
    <Layout style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <Sider visiable={visiable} collapsed={collapsed} />
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          visiable={visiable}
          projectName={project.projectName}
          username={user.username}
          collapsed={collapsed}
          toggle={visiable ? toggle : null}
          logout={logout}
        />
        <Content
          style={{ padding: '24px', minHeight: 'auto', textAlign: 'center' }}
        >
          <Suspense fallback={<Spin style={{ marginTop: '200px' }} />}>
            <Switch>
              {navList.map((nav, index) => (
                <Route key={index} {...nav} />
              ))}
            </Switch>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  project: state.project,
});

const mapDispatchToProps = { resetUser, resetProject, getProject, getUser };

export default connect(mapStateToProps, mapDispatchToProps)(Main);
