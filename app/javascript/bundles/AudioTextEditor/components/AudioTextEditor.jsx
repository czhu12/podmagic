import _ from "lodash";
import PropTypes from 'prop-types';
import React from 'react';
import ContentEditable from 'react-contenteditable'

import AudioControls from './AudioControls'
import AudioPlayer from './AudioPlayer'
import { isIE, isIOS } from '../utils';
import {
  findContiguousWordSpans,
  findSpanIndex,
  findSpanIndexOfWordTime,
} from '../utils/audioTimeManager';

export const isBetween = (current, start, end) => {
  return current > start && current <= end;
}

const highlightCurrentWord = (sortedWordTimes, wordTimes, audioTime, currentTime) => {
  const spans = findContiguousWordSpans(sortedWordTimes, wordTimes);
  const currentlyPlayingSpanIndex = findSpanIndex(currentTime, spans);

  let text = wordTimes.map((wordTime, wordTimeIndex) => {
    const spanIndexOfWordTime = findSpanIndexOfWordTime(wordTimeIndex, spans);
    if (currentlyPlayingSpanIndex === spanIndexOfWordTime &&
      isBetween(audioTime, wordTime['start_time'], wordTime['end_time'])) {
      return '<mark>' + wordTime['word'] + '</mark>';
    }
    return wordTime['word'];
  }).join(' ');

  text = text.replace(/\n$/g, '\n\n');

  // browser compatibility stuff
  if (isIE()) {
    // IE wraps whitespace differently in a div vs textarea, this fixes it
    text = text.replace(/ /g, ' <wbr>');
  }
  return text;
}


class AudioTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      scrollTop: 0,
      scrollLeft: 0,
    };
  }

  handleScroll() {
    const scrollTop = this.refs.textarea.scrollTop;
    const scrollLeft = this.refs.textarea.scrollLeft;
    this.setState({scrollTop, scrollLeft});
  }

  render() {
    let highlightsStyle = null;
    if (isIOS()) {
      highlightsStyle = {
        'paddingLeft': '+=3px',
        'paddingRight': '+=3px'
      };
    }

    if (this.refs.backdrop) {
      this.refs.backdrop.scrollTop = this.state.scrollTop;
      this.refs.backdrop.scrollLeft = this.state.scrollLeft;
    }
    const wordTimes = this.props.audioPlayer.wordTimes;
    const sortedWordTimes = this.props.audioPlayer.sortedWordTimes;
    const text = wordTimes.map(wordTime => wordTime['word']).join(' ');
    return (
      <div>
        <AudioPlayer
          source={this.props.audioPlayer.audioSrc}
          isPlaying={this.props.audioControls.isPlaying}
          onTimeUpdate={this.props.audioPlayerActions.onTimeUpdate}
          onEnd={this.props.audioPlayerActions.onEnd}
          onProgress={this.props.audioPlayerActions.onProgress}
        />
        <div className="audio-container">
          <div className="backdrop" ref="backdrop">
            <div
              className="highlights"
              style={highlightsStyle}
              ref="highlights"
              dangerouslySetInnerHTML={{
                __html: highlightCurrentWord(
                  sortedWordTimes,
                  wordTimes,
                  this.props.audioPlayer.audioTime,
                  this.props.audioPlayer.currentTime,
                )
              }}
            ></div>
          </div>
          <textarea
            id="audio-editor-textarea"
            ref="textarea"
            onKeyDown={this.props.onDeleteAudioTextEditor}
            onScroll={this.handleScroll}
            onCut={this.props.onCutAudioTextEditor}
            onCopy={this.props.onCopyAudioTextEditor}
            onPaste={this.props.onPasteAudioTextEditor}
            value={text}/>
        </div>
      
      <AudioControls
        audioControls={this.props.audioControls}
        audioControlActions={this.props.audioControlActions}
      />
      </div>
    );
  }
}

AudioTextEditor.propTypes = {
  audioPlayer: PropTypes.object.isRequired,
  onDeleteAudioTextEditor: PropTypes.func.isRequired,
  audioControls: PropTypes.object.isRequired,
  audioControlActions: PropTypes.object.isRequired,
  audioPlayerActions: PropTypes.object.isRequired,
};

export default AudioTextEditor;
