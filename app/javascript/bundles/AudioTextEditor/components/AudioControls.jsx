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
    let savingButtonView = null;
    if (this.props.audioControls.saving) {
      savingButtonView = (
        <a className="button is-pulled-right" disabled>
          <div>
            <span className="icon is-small">
              <i className="fas fa-spinner"/>
            </span>
            <span>Save</span>
          </div>
        </a>
      )
    } else {
      savingButtonView = (
        <a className="button is-pulled-right" onClick={this.props.audioControlActions.saveEdits}>
          <div>
            <span className="icon is-small">
              <i className="fas fa-save"/>
            </span>
            <span>Save</span>
          </div>
        </a>
      )
    }

    const downloadButtonView = (
      <a className="button is-pulled-right" onClick={this.props.audioControlActions.downloadEdits}>
        <div>
          <span className="icon is-small">
            <i className="fas fa-download"/>
          </span>
          <span>Download</span>
        </div>
      </a>
    );
    return (
      <div className="m-t-sm">
        <a className="button" onClick={this.props.audioControlActions.togglePlay}>
          {playPauseView}
        </a>
        {savingButtonView}
        {downloadButtonView}
      </div>
    );
  }
}
export default AudioControls;
