// Simple example of a React "smart" component

import { connect } from 'react-redux';
import AudioTextEditor from '../components/AudioTextEditor';
import * as actions from '../actions/audioTextEditorActionCreators';

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state) => ({
  audioPlayer: state.audioPlayer,
  audioControls: state.audioControls,
});

const mapDispatchToProps = (dispatch) => ({
  onCutAudioTextEditor: (e) => {
    let startIndex = document.getElementById("audio-editor-textarea").selectionStart;
    let endIndex = document.getElementById("audio-editor-textarea").selectionEnd;
    dispatch(actions.onCutAudioTextEditor(startIndex, endIndex))
  },
  onCopyAudioTextEditor: (e) => {
    let startIndex = document.getElementById("audio-editor-textarea").selectionStart;
    let endIndex = document.getElementById("audio-editor-textarea").selectionEnd;
    dispatch(actions.onCopyAudioTextEditor(startIndex, endIndex))
  },
  onPasteAudioTextEditor: (e) => {
    let index = document.getElementById("audio-editor-textarea").selectionStart;
    dispatch(actions.onPasteAudioTextEditor(index))
  },
  onDeleteAudioTextEditor: (e) => {
    if (e.keyCode === 8 || e.keyCode === 46) { // if backspace or delete is clicked
      let startIndex = document.getElementById("audio-editor-textarea").selectionStart;
      let endIndex = document.getElementById("audio-editor-textarea").selectionEnd;
      dispatch(actions.onDeleteAudioTextEditor(startIndex, endIndex))
    }
  },
  updateAudioTime: ({currentTime, trackDuration}) => {
    dispatch(actions.updateAudioTime(currentTime));
  },
  audioControlActions: {
    togglePlay: () => {
      dispatch(actions.togglePlay())
    }
  },
  audioPlayerActions: {
    onTimeUpdate: ({ currentTime, trackDuration }) => {
      dispatch(actions.updateAudioTime(currentTime));
    },
    onProgress: ({ trackDuration, buffered }) => {
    },
    onEnd: () => {
    },
  }
});

// Don't forget to actually use connect!
// Note that we don't export AudioTextEditor, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, mapDispatchToProps)(AudioTextEditor);
