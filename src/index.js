import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/zh_CN';

import store from './redux/store';
import Login from './containers/login/login';
import Register from './containers/register/register';
import Main from './containers/main/main';

import 'moment/locale/zh-cn';
import './assets/less/index.less';

ReactDOM.render(
  <ConfigProvider locale={locale}>
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={Main} />
        </Switch>
      </HashRouter>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);
