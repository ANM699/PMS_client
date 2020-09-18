import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Card, Modal } from 'antd';
import {
  PlusCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import ProjectList from '../../components/project/list';
import ProjectForm from '../../components/project/form';
import {
  // createProject,
  // getProjectList,
  switchProject,
} from '../../redux/project/actions';
import { reqProjectList, reqCreateProject } from '../../api/index';

class MyProjects extends Component {
  state = {
    visible: false,
    projectList: [],
    current: null,
  };

  showModal = (id) => {
    let current = null;
    if (id) {
      current = this.state.projectList.find((project) => project._id === id);
    }
    this.setState({
      visible: true,
      current,
    });
  };

  handleConfirm = (item) => {
    let that = this;
    Modal.confirm({
      title: '选择并切换至该项目？',
      icon: <ExclamationCircleOutlined />,
      cancelText: '取消',
      okText: '确定',
      onOk() {
        that.props.switchProject(item);
        //todo:重置store.state中的sprints
        Cookies.set('projectId', item._id);
        that.props.history.push('/project/profile');
      },
    });
  };

  handleOk = (e) => {
    this.form
      .validateFields()
      .then((value) => {
        const rangeDate = value['rangeDate'];
        value.startDate = rangeDate[0].format('YYYY-MM-DD');
        value.endDate = rangeDate[1].format('YYYY-MM-DD');
        // this.props.createProject(value);
        reqCreateProject(value).then((res) => {
          const result = res.data;
          if (result.code === 0) {
            this.setState({
              projectList: [result.data, ...this.state.projectList],
              visible: false,
            });
            this.form.resetFields();
          }
        });
      })
      .catch((info) => {
        console.log('验证失败：', info);
      });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    reqProjectList().then((res) => {
      const result = res.data;
      // console.log(result);
      if (result.code === 0) {
        this.setState({
          projectList: result.data,
        });
      }
    });
    // this.props.getProjectList();
  }

  render() {
    // const data = this.props.projectList;
    const { projectList, current } = this.state;
    return (
      <div>
        <Card
          title="我的项目"
          extra={
            <a onClick={this.showModal}>
              <PlusCircleOutlined style={{ fontSize: '24px' }} />
            </a>
          }
        >
          {/* <Button
            type="dashed"
            style={{
              width: "100%",
              marginBottom: 8,
            }}
            onClick={this.showModal}
          >
            <PlusCircleOutlined  />
            创建项目
          </Button> */}
          <ProjectList
            data={projectList}
            onConfirm={this.handleConfirm}
            onItemEditClick={this.showModal}
          ></ProjectList>
        </Card>

        <Modal
          title="创建项目"
          width={640}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <ProjectForm
            formRef={(el) => (this.form = el)}
            current={current}
          ></ProjectForm>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // projectList: state.projectList,
  project: state.project,
});

const mapDispatchToProps = { switchProject };

export default connect(mapStateToProps, mapDispatchToProps)(MyProjects);
