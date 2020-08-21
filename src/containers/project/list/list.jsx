/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, List, Modal, Form, Input, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
class ProjectList extends Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    this.form.validateFields().then((value)=>{
      console.log(value);
      this.form.resetFields();
      this.setState({
      visible: false,
    });
    }).catch((info) => {
      console.log('验证失败：',info);
    }
    )
   
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const data = [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.',
    ];
    return (
      <div>
        <Card title="项目列表">
          <Button
            type="dashed"
            style={{
              width: '100%',
              marginBottom: 8,
            }}
            onClick={this.showModal}
          >
            <PlusOutlined />
            创建项目
          </Button>
          <List
            size="large"
            dataSource={data}
            renderItem={(item) => (
              <List.Item actions={[<a key="edit">编辑</a>]}>
                <List.Item.Meta title={<a>{item}</a>} />
              </List.Item>
            )}
          />
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
          <Form ref={(form)=>this.form=form}
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 13,
            }}
          >
            <Form.Item
              name="projectName"
              label="项目名称"
              rules={[
                {
                  required: true,
                  message: '请输入项目名称！',
                },
              ]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name="startDate"
              label="开始时间"
              rules={[
                {
                  required: true,
                  message: '请选择开始时间！',
                },
              ]}
            >
              <DatePicker
                placeholder="请选择"
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="项目简介"
              rules={[
                {
                  required: true,
                  message: '请输入至少五个字符的项目简介！',
                  min: 5,
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="请输入至少五个字符" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
