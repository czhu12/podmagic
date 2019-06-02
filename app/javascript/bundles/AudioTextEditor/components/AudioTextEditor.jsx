import PropTypes from 'prop-types';
import React from 'react';
import ContentEditable from 'react-contenteditable'
import AudioControls from './AudioControls'
import AudioPlayer from './AudioPlayer'

const getUserAgent = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  const isIE = !!ua.match(/msie|trident\/7|edge/);
  const isWinPhone = ua.indexOf('windows phone') !== -1;
  const isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);
  return { isIE, isWinPhone, isIOS }
}

const isIE = () => getUserAgent().isIE;
const isIOS = () => getUserAgent().isIOS;

const isBetween = (current, start, end) => {
  return current > start && current <= end;
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

  highlightCurrentWord(wordTimes, currentTime) {
    let text = wordTimes.map(wordTime => {
      if (isBetween(currentTime, wordTime['start_time'], wordTime['end_time'])) {
        return '<mark>' + wordTime['word'] + '</mark>';
      }
      return wordTime['word'];
    }).join(' ');
    text = text.replace(/\n$/g, '\n\n');
    if (isIE()) {
      // IE wraps whitespace differently in a div vs textarea, this fixes it
      text = text.replace(/ /g, ' <wbr>');
    }
    return text;
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
    const text = wordTimes.map(wordTime => wordTime['word']).join(' ');
    return (
      <div>
        <AudioPlayer
          source="/demo-cut-mono.mp3"
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
              dangerouslySetInnerHTML={{__html:this.highlightCurrentWord(wordTimes, this.props.audioPlayer.audioTime)}}
            ></div>
          </div>
          <textarea
            id="audio-editor-textarea"
            ref="textarea"
            onKeyDown={this.props.onDeleteEditableHtml}
            onScroll={this.handleScroll}
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
  onDeleteEditableHtml: PropTypes.func.isRequired,
  audioControls: PropTypes.object.isRequired,
  audioControlActions: PropTypes.object.isRequired,
  audioPlayerActions: PropTypes.object.isRequired,
};

export default AudioTextEditor;
