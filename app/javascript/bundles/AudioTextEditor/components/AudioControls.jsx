import React from 'react';

class AudioControls extends React.Component {
  render() {
    let playPauseView = null;
    if (this.props.audioControls.isPlaying) {
      playPauseView = (
        <div>
          <span className="icon is-small">
            <i className="fas fa-pause"/>
          </span>
          <span>Pause</span>
        </div>
      );
    } else {
      playPauseView = (
        <div>
          <span className="icon is-small">
            <i className="fas fa-play"/>
          </span>
          <span>Play</span>
        </div>
      );
    }
    return (
      <div className="m-t-sm">
        <a className="button" onClick={this.props.audioControlActions.togglePlay}>
          {playPauseView}
        </a>
        <a className="button is-pulled-right" onClick={this.props.audioControlActions.saveEdits}>
          <div>
            <span className="icon is-small">
              <i className="fas fa-save"/>
            </span>
            <span>Save</span>
          </div>
        </a>
      </div>
    );
  }
}
export default AudioControls;
