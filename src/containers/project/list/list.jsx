/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
class ProjectList extends Component {
  render() {
    const data = [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.',
    ];
    return (
      <Card title="项目列表">
        <Button
          type="dashed"
          style={{
            width: '100%',
            marginBottom: 8,
          }}
          onClick={() => {
            this.props.history.push('/create');
          }}
        >
          <PlusOutlined />
          添加
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
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
