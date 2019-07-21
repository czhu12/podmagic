import React, { Component } from "react";

class ProgressBar extends Component {
  render() {
    const className = "progress " + this.props.className;
    return (
      <progress
        className={className}
        value={this.props.progress}
        style={this.props.style}
        max="100"
      >
        {this.props.progress + "%"}
      </progress>
    );
  }
}

export default ProgressBar;
