import React, { Component } from 'react';

export default class Meeting extends Component {
  componentDidMount() {
    console.log('componentDidMount');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }
  render() {
    console.log('render');
    return <div>meeting</div>;
  }
}
