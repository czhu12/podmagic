import { combineReducers } from 'redux';
import {
  HELLO_WORLD_NAME_UPDATE,
  AUDIO_TIME_UPDATE,
  ON_CUT_EDITABLE_HTML,
  ON_COPY_EDITABLE_HTML,
  ON_PASTE_EDITABLE_HTML,
  ON_DELETE_EDITABLE_HTML,
  AUDIO_CONTROLS_TOGGLE_PLAY,
} from '../constants/audioTextEditorConstants';

const isBetween = (current, start, end) => {
  return current >= start && current <= end;
}

const computeWordTimesDeletedFromCharRange = (startIndex, endIndex, wordTimes) => {
  let indexesToDelete = []
  let currentPosition = 0;
  wordTimes.forEach((wordTime, index) => {
    if (isBetween(currentPosition, startIndex, endIndex)) {
      indexesToDelete.push(index);
    }
    currentPosition += wordTime['word'].length + 1;
  })
  return wordTimes.filter((wordTime, index) => {
    return !(indexesToDelete.includes(index));
  });
}

const audioControls = (
  state = {
    isPlaying: false,
  },
  action,
) => {
  switch (action.type) {
    case AUDIO_CONTROLS_TOGGLE_PLAY:
      return {...state, isPlaying: !state.isPlaying};
    default:
      return state;
  }
};

const audioPlayer = (
  state = {
    name: '',
    wordTimes: [],
    audioTime: 0,
    html: '',
    textInClipboard: null,
  },
  action,
) => {
  switch (action.type) {
    case HELLO_WORLD_NAME_UPDATE:
      return {...state, name: action.name};
    case AUDIO_TIME_UPDATE:
      return {...state, audioTime: action.audioTime};
    case ON_DELETE_EDITABLE_HTML:
      const wordTimes = computeWordTimesDeletedFromCharRange(action.startIndex, action.endIndex, state.wordTimes);
      return {...state, wordTimes: wordTimes};
    default:
      return state;
  }
};

const audioTextEditorReducer = combineReducers({ audioPlayer, audioControls });

export default audioTextEditorReducer;
