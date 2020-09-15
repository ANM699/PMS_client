import React, { Component } from 'react';
import { Card, Table, Collapse, Radio } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

const { Panel } = Collapse;
const options = [
  { label: '2周', value: 14 },
  { label: '3周', value: 21 },
  { label: '4周', value: 28 },
];

class Sprint extends Component {
  state = {
    sprints: [],
    value: null,
  };

  generateSprint = (e) => {
    const { startDate, endDate } = this.props.project;
    const offset = e.target.value;
    const sprints = [];
    function calDeadline(start, end, offset) {
      if (moment(start).isAfter(end)) return;
      if (moment(start).isSame(end))
        sprints.push({ startDate: start, endDate: end });
      let deadline = moment(start).add(offset, 'days').format('YYYY-MM-DD');
      if (moment(deadline).isAfter(end)) deadline = end;
      sprints.push({ startDate: start, endDate: deadline });
      const nextStart = moment(deadline).add(1, 'days').format('YYYY-MM-DD');
      calDeadline(nextStart, end, offset);
    }
    calDeadline(startDate, endDate, offset);
    console.log(sprints);
    this.setState({ sprints, value: offset });
  };

  render() {
    console.log(this.props.project);

    const radio = (
      <Radio.Group
        options={options}
        onChange={this.generateSprint}
        value={this.state.value}
        optionType="button"
      />
    );
    return (
      <Card title="项目周期" extra={radio}>
        {this.state.sprints.length !== 0 && (
          <Collapse expandIconPosition="right">
            {this.state.sprints.map((sprint, index) => (
              <Panel
                header={sprint.startDate + '~' + sprint.endDate}
                key={index}
              >
                <div>
                  {moment().isBetween(
                    sprint.startDate,
                    sprint.endDate,
                    null,
                    '[]'
                  ) && '当前所处周期'}
                </div>
              </Panel>
            ))}
          </Collapse>
        )}
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  // projectList: state.projectList,
  project: state.project,
});

export default connect(mapStateToProps)(Sprint);
