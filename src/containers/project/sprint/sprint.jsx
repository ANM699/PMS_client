import React, { Component } from 'react';
import { Card, Table, Form, DatePicker, Modal } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ProjectOutlined, PlusCircleFilled } from '@ant-design/icons';

import { createSprint, getSprints } from '../../../redux/sprints/actions';

import styles from './sprint.module.less';

const { RangePicker } = DatePicker;
const { Column } = Table;

class Sprint extends Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleOk = (e) => {
    this.form
      .validateFields()
      .then((value) => {
        const rangeDate = value['rangeDate'];
        const startDate = rangeDate[0].format('YYYY-MM-DD');
        const endDate = rangeDate[1].format('YYYY-MM-DD');
        this.props.createSprint({ startDate, endDate });
        this.setState({
          visible: false,
        });
        this.form.resetFields();
      })
      .catch((info) => {
        console.log('验证失败：', info);
      });
  };

  componentDidMount() {
    this.props.getSprints();
  }

  render() {
    const { startDate, endDate } = this.props.project;
    const sprints = this.props.sprints;
    const length = sprints.length;

    let newStartDate = startDate;

    if (length > 0) {
      const lastEndDate = sprints[length - 1].endDate;
      newStartDate = moment(lastEndDate).add(1, 'days').format('YYYY-MM-DD');
    }

    return (
      <div>
        <Card
          title="项目周期"
          extra={
            <a onClick={this.showModal}>
              <PlusCircleFilled style={{ fontSize: '32px' }} />
            </a>
          }
        >
          <Table
            dataSource={sprints}
            pagination={false}
            showHeader={false}
            rowKey="_id"
            rowClassName={(record) => {
              return moment().isBetween(
                record.startDate,
                record.endDate,
                null,
                '[]'
              )
                ? styles.curSprint
                : null;
            }}
          >
            <Column title="开始时间" dataIndex="startDate" key="startDate" />
            <Column title="结束时间" dataIndex="endDate" key="endDate" />
            <Column title="完成情况" key="status" render={() => '8/15'} />
            <Column
              title="查看任务"
              key="tasks"
              render={() => (
                <Link to="/project/board">
                  <ProjectOutlined />
                </Link>
              )}
            />
          </Table>
        </Card>

        <Modal
          title="新增周期"
          width={480}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <Form ref={(el) => (this.form = el)}>
            <Form.Item
              name="rangeDate"
              rules={[
                {
                  required: true,
                  message: '请选择周期时间！',
                },
              ]}
            >
              <RangePicker
                disabledDate={(currentDate) =>
                  !currentDate.isBetween(newStartDate, endDate, 'day', '[]')
                }
                defaultPickerValue={[moment(newStartDate)]}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // projectList: state.projectList,
  project: state.project,
  sprints: state.sprints,
});

const mapDispatchToProps = { createSprint, getSprints };

export default connect(mapStateToProps, mapDispatchToProps)(Sprint);
