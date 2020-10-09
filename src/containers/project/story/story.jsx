import React, { Component } from 'react';
import { Card, Table, Form, DatePicker, Modal, Tag, Divider } from 'antd';
import { Link } from 'react-router-dom';
import {
  EditOutlined,
  PlusCircleOutlined,
  ForkOutlined,
} from '@ant-design/icons';

import TaskProgress from '../../../components/task-progress/task-progress';
import AddTaskModal from '../../../components/task/add-modal';
import StoryModal from '../../../components/story/modal';
import TaskList from '../task/task';
import {
  reqCreateTask,
  reqCreateStory,
  reqStoryList,
  reqEditStory,
} from '../../../api/index';

import { sortTasks, status } from '../../../utils/index';

const { Column } = Table;

const priority = [
  {
    color: '#2ac06d',
    display: '低',
  },
  {
    color: '#f9944a',
    display: '中',
  },
  {
    color: '#ff4d4f',
    display: '高',
  },
];

export default class Story extends Component {
  state = {
    storyModalVisible: false,
    taskModalVisible: false,
    current: null,
    storyList: [],
  };
  showStoryModal = (current) => {
    this.setState({
      storyModalVisible: true,
      current,
    });
  };

  showTaskModal = (current) => {
    this.setState({
      taskModalVisible: true,
      current,
    });
  };

  handleStoryCancel = (e) => {
    this.setState({
      storyModalVisible: false,
    });
  };

  handleTaskCancel = (e) => {
    this.setState({
      taskModalVisible: false,
    });
  };

  handleTaskOk = (values) => {
    values.createDate = values.createDate.format('YYYY-MM-DD');
    reqCreateTask(values).then((res) => {
      const result = res.data;
      if (result.code === 0) {
        const storyList = this.state.storyList.map((story) => {
          if (story._id === this.state.current._id) {
            story.tasks.todo.push(result.data);
          }
          return story;
        });
        this.setState({
          storyList,
          taskModalVisible: false,
        });
      }
    });
  };

  handleStoryOk = (values) => {
    const current = this.state.current;
    const _id = current ? current._id : '';
    values.date = values.date.format('YYYY-MM-DD');

    if (_id) {
      //编辑
      reqEditStory({ ...values, _id }).then((res) => {
        const result = res.data;
        if (result.code === 0) {
          const storyList = this.state.storyList.map((story) =>
            story._id === _id ? { ...story, ...result.data } : story
          );
          this.setState({
            storyList,
            storyModalVisible: false,
          });
        }
      });
    } else {
      reqCreateStory(values).then((res) => {
        const result = res.data;
        if (result.code === 0) {
          this.setState({
            storyList: [result.data, ...this.state.storyList],
            storyModalVisible: false,
          });
        }
      });
    }
  };

  componentDidMount() {
    reqStoryList().then((res) => {
      const result = res.data;
      if (result.code === 0) {
        result.data.forEach((story) => {
          const tasks = story.tasks;
          story.tasks = sortTasks(tasks);
        });
        this.setState({
          storyList: result.data,
        });
      }
    });
  }

  render() {
    const {
      taskModalVisible,
      storyModalVisible,
      storyList,
      current,
    } = this.state;
    return (
      <div>
        <Card
          title="项目需求"
          extra={
            <a
              onClick={(e) => {
                e.preventDefault();
                this.showStoryModal();
              }}
            >
              <PlusCircleOutlined style={{ fontSize: '24px' }} />
            </a>
          }
        >
          <Table
            dataSource={storyList}
            pagination={false}
            rowKey="_id"
            expandable={{
              expandedRowRender: (record) => {
                const data = Object.values(record.tasks).flat();
                return (
                  <TaskList
                    data={data}
                    status={status}
                    size="small"
                    editable={false}
                  ></TaskList>
                );
              },
              rowExpandable: (record) =>
                Object.values(record.tasks).flat().length > 0,
            }}
          >
            <Column
              width="80px"
              title="优先级"
              dataIndex="priority"
              key="priority"
              render={(value) => {
                const p = priority[value];
                return (
                  <Tag
                    style={{ width: '40px', textAlign: 'center' }}
                    color={p.color}
                  >
                    {p.display}
                  </Tag>
                );
              }}
            />
            <Column title="角色" dataIndex="role" key="role" />
            <Column title="行为" dataIndex="activity" key="activity" />
            <Column
              title="目的"
              dataIndex="businessValue"
              key="businessValue"
              progress
            />

            <Column
              title="任务进度"
              dataIndex="_id"
              render={(id, record) => {
                return (
                  <Link to={`/project/board/story/${id}`}>
                    <TaskProgress
                      todo={record.tasks.todo.length}
                      doing={record.tasks.doing.length}
                      done={record.tasks.done.length}
                    />
                  </Link>
                );
              }}
            />
            <Column title="提出日期" dataIndex="date" key="date" />
            <Column
              title="操作"
              key="_id"
              render={(id, record) => (
                <>
                  <a onClick={() => this.showStoryModal(record)}>
                    <EditOutlined />
                  </a>
                  <Divider type="vertical" />
                  <a onClick={() => this.showTaskModal(record)}>
                    <ForkOutlined />
                  </a>
                </>
              )}
            />
          </Table>
        </Card>

        <AddTaskModal
          visible={taskModalVisible}
          onOk={this.handleTaskOk}
          onCancel={this.handleTaskCancel}
        ></AddTaskModal>
        <StoryModal
          visible={storyModalVisible}
          onOk={this.handleStoryOk}
          onCancel={this.handleStoryCancel}
          story={current}
        ></StoryModal>
      </div>
    );
  }
}
