import React, { Component } from "react";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <progress
        className="progress is-primary"
        value={this.props.progress}
        max="100"
        >
          {this.props.progress + "%"}
      </progress>
    );
  }
}

export default ProgressBar;
