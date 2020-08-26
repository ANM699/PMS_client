import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

import './login.less';

import { login } from '../../redux/user/actions';

class Login extends Component {
  onFinish = (user) => {
    this.props.login(user);
    console.log('Success:', user);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const userId = Cookies.get('userId');
    const { msg } = this.props.user;
    if (userId) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="content">
          <div className="main">
            <Form
              wrapperCol={{ span: 24 }}
              name="loginForm"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item>
                {msg ? <Alert type="error" message={msg} showIcon /> : null}
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名！',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="用户名"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="login">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { login })(Login);
