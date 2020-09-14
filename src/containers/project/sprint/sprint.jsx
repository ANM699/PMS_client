import React, { Component } from "react";
import { Card, Table, Collapse } from "antd";
import { connect } from "react-redux";
import moment from "moment";

const { Panel } = Collapse;

class Sprint extends Component {
  state = {
    sprints: [],
  };

  generateSprint = () => {
    const { startDate, endDate } = this.props.project;
    const sprints = [];
    function calDeadline(start, end) {
      if (moment(start).isAfter(end)) return;
      if (moment(start).isSame(end))
        sprints.push({ startDate: start, endDate: end });
      let deadline = moment(start).add(9, "days").format("YYYY-MM-DD");
      if (moment(deadline).isAfter(end)) deadline = end;
      sprints.push({ startDate: start, endDate: deadline });
      const nextStart = moment(deadline).add(1, "days").format("YYYY-MM-DD");
      calDeadline(nextStart, end);
    }
    calDeadline(startDate, endDate);
    console.log(sprints);
    this.setState({ sprints });
  };

  render() {
    console.log(this.props.project);
    return (
      <Card
        title="项目周期"
        extra={<a onClick={this.generateSprint}>生成项目周期</a>}
      >
        <Collapse expandIconPosition="right">
          {this.state.sprints.map((sprint, index) => (
            <Panel header="This is panel header 1" key={index}>
              <div>
                {sprint.startDate}~{sprint.endDate}
              </div>
            </Panel>
          ))}
        </Collapse>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  // projectList: state.projectList,
  project: state.project,
});

export default connect(mapStateToProps)(Sprint);
