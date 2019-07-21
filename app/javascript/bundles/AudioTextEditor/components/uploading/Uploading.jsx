import React from 'react';
import ProgressBar from './ProgressBar';

class Uploading extends React.Component {
  render() {
    const uploaded = this.props.mediaFile.uploaded;
    const transcribed = this.props.mediaFile.transcribed;
    const progress = 20;

    let step = null;
    let subtitle = null;
    if (!uploaded) {
      step = "Uploading";
      subtitle = "Please don't leave this page!";
    } else {
      step = "Transcribing"
      subtitle = "You can leave this page, and come back later.";
    }
    return (
      <div className="center">
        <img
          src="https://66.media.tumblr.com/250980178dbd5606254cc0266efc8891/tumblr_olztqo8gzk1qk7puko1_400.gif"
          height={350}
          width={350}
        />
        <ProgressBar progress={progress} className={"m-t-lg is-primary center"} style={{width: '500px'}} />
        <div className="subtitle is-2">{step}...</div>
        <div className="subtitle is-5">{subtitle}</div>
      </div>
    );
  }
}
export default Uploading;
