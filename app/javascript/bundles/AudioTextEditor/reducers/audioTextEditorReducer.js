import { combineReducers } from 'redux';
import {
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

const insertWordTimesAtCharIndex = (pasteIndex, wordTimes, wordTimesToInsert) => {
  // This is an invalid action if the paste position is not at a word boundary
  let currentPosition = 0;
  let selectedWordIndex = wordTimes.length;
  for (let index = 0; index < wordTimes.length; index++) {
    const wordTime = wordTimes[index];
    if (currentPosition >= pasteIndex) {
      selectedWordIndex = index;
      break;
    }
    currentPosition += wordTime['word'].length + 1;
  };

  return wordTimes
    .slice(0, selectedWordIndex)
    .concat(wordTimesToInsert)
    .concat(wordTimes.slice(selectedWordIndex, wordTimes.length));
}

const selectedIndexesFromCharRange = (startIndex, endIndex, wordTimes) => {
  let selectedIndexes = []
  let currentPosition = 0;
  wordTimes.forEach((wordTime, index) => {
    if (isBetween(currentPosition, startIndex, endIndex)) {
      selectedIndexes.push(index);
    }
    currentPosition += wordTime['word'].length + 1;
  });
  return selectedIndexes;
}

const selectedWordTimesFromCharRange = (startIndex, endIndex, wordTimes) => {
  const selectedIndexes = selectedIndexesFromCharRange(startIndex, endIndex, wordTimes);
  return wordTimes.filter((_, index) => {
    return selectedIndexes.includes(index);
  });
}

const wordTimesDeletedFromCharRange = (startIndex, endIndex, wordTimes) => {
  const selectedIndexes = selectedIndexesFromCharRange(startIndex, endIndex, wordTimes);
  return wordTimes.filter((_, index) => {
    return !(selectedIndexes.includes(index));
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
    title: '',
    audioSrc: null,
    wordTimes: [],
    audioTime: 0,
    html: '',
    wordTimesInClipboard: null,
  },
  action,
) => {
  switch (action.type) {
    case AUDIO_TIME_UPDATE:
      return {...state, audioTime: action.audioTime};
    case ON_DELETE_EDITABLE_HTML:
      return {
        ...state,
        wordTimes: wordTimesDeletedFromCharRange(
          action.startIndex,
          action.endIndex,
          state.wordTimes,
        )
      };
    case ON_CUT_EDITABLE_HTML:
      return {
        ...state,
        wordTimesInClipboard: selectedWordTimesFromCharRange(
          action.startIndex,
          action.endIndex,
          state.wordTimes,
        ),
        wordTimes: wordTimesDeletedFromCharRange(
          action.startIndex,
          action.endIndex,
          state.wordTimes,
        ),
      };
    case ON_COPY_EDITABLE_HTML:
      const selectedWordTimes = selectedWordTimesFromCharRange(
        action.startIndex, action.endIndex, state.wordTimes);
      return {...state, wordTimesInClipboard: selectedWordTimes };
    case ON_PASTE_EDITABLE_HTML:
      const wordTimes = insertWordTimesAtCharIndex(
        action.index,
        state.wordTimes,
        state.wordTimesInClipboard,
      )
      return {...state, wordTimes};
    default:
      return state;
  }
};

const audioTextEditorReducer = combineReducers({ audioPlayer, audioControls });

export default audioTextEditorReducer;
