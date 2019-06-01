import { combineReducers } from 'redux';
import {
  HELLO_WORLD_NAME_UPDATE,
  AUDIO_TIME_UPDATE,
  ON_CUT_EDITABLE_HTML,
  ON_COPY_EDITABLE_HTML,
  ON_PASTE_EDITABLE_HTML,
  ON_DELETE_EDITABLE_HTML,
} from '../constants/helloWorldConstants';

const computeWordTimesDeletedFromRange = (startIndex, endIndex, wordTimes) => {
  return wordTimes.filter((wordTime, index) => {
    return !(index >= startIndex && index <= endIndex);
  });
}

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
      const wordTimes = computeWordTimesDeletedFromRange(action.startIndex, action.endIndex, state.wordTimes);
      return {...state, wordTimes: wordTimes};
    default:
      return state;
  }
};

const helloWorldReducer = combineReducers({ audioPlayer });

export default helloWorldReducer;
