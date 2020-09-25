import React, { Component } from 'react';
import { Card, Table, Form, DatePicker, Modal, Divider } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { PlusCircleOutlined, FileAddOutlined } from '@ant-design/icons';

import TaskProgress from '../../../components/task-progress/task-progress';
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
          title="项目阶段"
          extra={
            <a onClick={this.showModal}>
              <PlusCircleOutlined style={{ fontSize: '24px' }} />
            </a>
          }
        >
          <Table
            dataSource={sprints}
            pagination={false}
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
            <Column
              title="阶段周期"
              key="date"
              render={(value, record) =>
                `${record.startDate}~${record.endDate}`
              }
            />
            <Column
              title="任务进度"
              dataIndex="_id"
              render={(id) => (
                <Link to={`/project/board/sprint/${id}`}>
                  <TaskProgress todo={3} doing={5} done={4} />
                </Link>
              )}
            />
            <Column
              title="操作"
              key="tasks"
              render={() => (
                <>
                  {/* <Link to="/project/board">
                    <ProjectOutlined />
                  </Link>
                  <Divider type="vertical" /> */}
                  <a>
                    <FileAddOutlined />
                  </a>
                </>
              )}
            />
          </Table>
        </Card>

        <Modal
          title="新增阶段"
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
                  message: '请选择阶段时间！',
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
