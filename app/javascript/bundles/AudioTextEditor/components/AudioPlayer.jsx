import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleMediaEnd = this.handleMediaEnd.bind(this);
  }

  render() {
    return (
      <audio preload='none' id='audio-player'>
        <source src={this.props.source} type='audio/mpeg' />
      </audio>
    );
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);

    //node.addEventListener('timeupdate', this.handleTimeUpdate);
    node.addEventListener('progress', this.handleProgress);
    node.addEventListener('ended', this.handleMediaEnd);
    this.timerID = setInterval(this.handleTimeUpdate, 50);
    this.updateIsPlaying();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.source !== this.props.source) {
      this.updateSource();
    }

    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.updateIsPlaying();
    }

    if (prevProps.defaultTime !== this.props.defaultTime) {
      this.updateCurrentTime();
    }
  }

  componentWillUnmount() {
    const node = ReactDOM.findDOMNode(this);

    //node.removeEventListener('timeupdate', this.handleTimeUpdate);
    node.removeEventListener('progress', this.handleProgress);
    node.removeEventListener('ended', this.handleMediaEnd);
    clearInterval(this.timerID);
  }

  handleTimeUpdate() {
    const node = ReactDOM.findDOMNode(this);
    const currentTime = node.currentTime;
    const trackDuration = node.duration;

    this.props.onTimeUpdate({
      currentTime: currentTime,
      trackDuration: trackDuration
    });
  }

  handleMediaEnd() {
    ReactDOM.findDOMNode(this).currentTime = 0;

    this.props.onEnd();
  }

  handleProgress() {
    const node = ReactDOM.findDOMNode(this);
    const trackDuration = node.duration;
    const buffered = node.buffered;

    this.props.onProgress({
      trackDuration: trackDuration,
      buffered: buffered
    });
  }

  updateCurrentTime() {
    const node = ReactDOM.findDOMNode(this);

    if (node.readyState) {
      node.currentTime = this.props.defaultTime;
    }
  }

  updateIsPlaying() {
    const node = ReactDOM.findDOMNode(this);
    const isPlaying = this.props.isPlaying;

    if (isPlaying) {
      node.play();
    } else {
      node.pause();
    }
  }

  updateSource() {
    const node = ReactDOM.findDOMNode(this);
    const isPlaying = this.props.isPlaying;

    node.pause();
    this.props.onTimeUpdate({
      currentTime: 0,
      trackDuration: node.duration
    });

    node.load();
    if (isPlaying) {
      node.play();
    }
  }
};


AudioPlayer.propTypes = {
  source: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  defaultTime: PropTypes.number,
  onProgress: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired
};

export default AudioPlayer;
