import React from 'react';
import {
  findContiguousWordSpans,
  calculateTotalTime,
} from '../utils/audioTimeManager';

class PlayHeadCursor extends React.Component {
  render() {
    const spans = findContiguousWordSpans(
      this.props.audioPlayer.sortedWordTimes,
      this.props.audioPlayer.wordTimes,
    );
    const totalTime = calculateTotalTime(spans);
    const fraction = Math.round(this.props.audioPlayer.currentTime * 100 / totalTime);
    const currentTimeDate = new Date(null);
    currentTimeDate.setSeconds(this.props.audioPlayer.currentTime);
    const currentTimeString = currentTimeDate.toISOString().substr(11, 8);

    const totalTimeDate = new Date(null);
    totalTimeDate.setSeconds(totalTime);
    const totalTimeString = totalTimeDate.toISOString().substr(11, 8);

    return (
      <div>
        <progress id="playhead" className="progress m-t-sm" value={fraction} max="100">{fraction}%</progress>
        <div>
          {currentTimeString} / {totalTimeString}
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default PlayHeadCursor;
