/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import ProjectList from "../../../components/project/list";
import ProjectForm from "../../../components/project/form";
import {
  createProject,
  getProjectList,
  switchProject,
} from "../../../redux/actions";

class MyProjects extends Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleConfirm = (item) => {
    console.log(item);
    this.props.switchProject(item);
  };

  handleOk = (e) => {
    this.form
      .validateFields()
      .then((value) => {
        const rangeDate = value["rangeDate"];
        value.startDate = rangeDate[0].format("YYYY-MM-DD");
        value.endDate = rangeDate[1].format("YYYY-MM-DD");
        this.props.createProject(value);
        this.form.resetFields();
        this.setState({
          visible: false,
        });
      })
      .catch((info) => {
        console.log("验证失败：", info);
      });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    this.props.getProjectList();
  }

  render() {
    const data = this.props.projectList;
    return (
      <div>
        <Card title="项目列表">
          <Button
            type="dashed"
            style={{
              width: "100%",
              marginBottom: 8,
            }}
            onClick={this.showModal}
          >
            <PlusOutlined />
            创建项目
          </Button>
          <ProjectList data={data} onConfirm={this.handleConfirm}></ProjectList>
        </Card>

        <Modal
          title="创建项目"
          width={640}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="保存"
          cancelText="取消"
        >
          <ProjectForm formRef={(el) => (this.form = el)}></ProjectForm>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projectList: state.projectList,
  project: state.project,
});

const mapDispatchToProps = { createProject, getProjectList, switchProject };

export default connect(mapStateToProps, mapDispatchToProps)(MyProjects);
