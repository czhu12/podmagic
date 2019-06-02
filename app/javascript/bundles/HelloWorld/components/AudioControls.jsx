import React from 'react';

class AudioControls extends React.Component {
  render() {
    let audioControlView = null;
    if (this.props.audioControls.playing) {
      audioControlView = (
        <div>
          <span className="icon is-small">
            <i className="fas fa-pause"/>
          </span>
          <span>Pause</span>
        </div>
      );
    } else {
      audioControlView = (
        <div>
          <span className="icon is-small">
            <i className="fas fa-play"/>
          </span>
          <span>Play</span>
        </div>
      );
    }
    return (
      <a className="button" onClick={this.props.audioControlActions.togglePlay}>
        {audioControlView}
      </a>
    );
  }
}
export default AudioControls;
