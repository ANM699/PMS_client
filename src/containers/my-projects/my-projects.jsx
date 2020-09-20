import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { Card, Modal } from "antd";
import {
  PlusCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import ProjectList from "../../components/project/list";
import ProjectModal from "../../components/project/modal";
import {
  // createProject,
  // getProjectList,
  switchProject,
} from "../../redux/project/actions";
import {
  reqProjectList,
  reqCreateProject,
  reqEditProject,
} from "../../api/index";

class MyProjects extends Component {
  state = {
    visible: false,
    projectList: [],
    current: null,
  };

  showModal = (current) => {
    console.log(current);
    this.setState({
      visible: true,
      current,
    });
  };

  handleConfirm = (item) => {
    let that = this;
    Modal.confirm({
      title: "选择并切换至该项目？",
      icon: <ExclamationCircleOutlined />,
      cancelText: "取消",
      okText: "确定",
      onOk() {
        that.props.switchProject(item);
        //todo:重置store.state中的sprints
        Cookies.set("projectId", item._id);
        that.props.history.push("/project/profile");
      },
    });
  };

  handleOk = (values) => {
    const current = this.state.current;
    const _id = current ? current._id : "";
    const rangeDate = values["rangeDate"];
    values.startDate = rangeDate[0].format("YYYY-MM-DD");
    values.endDate = rangeDate[1].format("YYYY-MM-DD");

    if (_id) {
      //编辑
      reqEditProject({ ...values, _id }).then((res) => {
        const result = res.data;
        if (result.code === 0) {
          const projectList = this.state.projectList.map((project) =>
            project._id === _id ? result.data : project
          );
          this.setState({
            projectList,
            visible: false,
          });
        }
      });
    } else {
      //创建
      reqCreateProject(values).then((res) => {
        const result = res.data;
        if (result.code === 0) {
          this.setState({
            projectList: [result.data, ...this.state.projectList],
            visible: false,
          });
        }
      });
    }
  };

  handleCancel = () => {
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
            <a
              onClick={(e) => {
                e.preventDefault();
                this.showModal();
              }}
            >
              <PlusCircleOutlined style={{ fontSize: "24px" }} />
            </a>
          }
        >
          <ProjectList
            data={projectList}
            onConfirm={this.handleConfirm}
            onItemEditClick={this.showModal}
          ></ProjectList>
        </Card>

        <ProjectModal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          project={current}
        ></ProjectModal>
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
