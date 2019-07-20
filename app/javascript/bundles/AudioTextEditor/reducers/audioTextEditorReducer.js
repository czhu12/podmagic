import { combineReducers } from 'redux';
import {
  AUDIO_TIME_UPDATE,
  ON_CUT_EDITABLE_HTML,
  ON_COPY_EDITABLE_HTML,
  ON_PASTE_EDITABLE_HTML,
  ON_DELETE_EDITABLE_HTML,
  ON_CLICK_AUDIO_TEXT_EDITOR,
  AUDIO_CONTROLS_TOGGLE_PLAY,
  AUDIO_CONTROLS_SAVE,

  REQUEST_SAVE_AUDIO_TEXT,
  REQUEST_SAVE_AUDIO_TEXT_SUCCESS,
  REQUEST_SAVE_AUDIO_TEXT_FAILED,
  EDIT_GAP_TIMES,
} from '../constants/audioTextEditorConstants';
import { isBetween } from '../utils';
import {
  calculateCurrentTime,
  findContiguousWordSpans,
  findSpanIndex,
} from '../utils/audioTimeManager';

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
    saving: false,
  },
  action,
) => {
  switch (action.type) {
    case AUDIO_CONTROLS_TOGGLE_PLAY:
      return {...state, isPlaying: !state.isPlaying};
    case REQUEST_SAVE_AUDIO_TEXT:
      return {...state, saving: true};
    case REQUEST_SAVE_AUDIO_TEXT_SUCCESS:
      return {...state, saving: false};
    case REQUEST_SAVE_AUDIO_TEXT_FAILED:
      return {...state, saving: false};
    default:
      return state;
  }
};

const audioPlayer = (
  state = {
    id: null,
    title: '',
    audioSrc: null,
    wordTimes: [],
    sortedWordTimes: [],
    audioTime: 0, // Audio time tracks where the play head currently is.
    currentTime: 0, // Current time is monotomically increasing, regardless of edits.
    html: '',
    wordTimesInClipboard: null,
    currentSpanIndex: 0,
  },
  action,
) => {
  switch (action.type) {
    case AUDIO_TIME_UPDATE:
      // We need to calculate if this time needs to jump.
      const newCurrentTime = calculateCurrentTime(
        state.sortedWordTimes,
        state.wordTimes,
        state.currentTime,
        action.audioTime,
      );

      const spans = findContiguousWordSpans(
        state.sortedWordTimes, state.wordTimes);
      const spanIndex = findSpanIndex(newCurrentTime, spans);
      if (spanIndex !== -1 &&
        spanIndex !== state.currentSpanIndex &&
        spanIndex > state.currentSpanIndex
      ) {
        document.getElementById("audio-player").currentTime = spans[spanIndex]['startTime'];
      }
      return {
        ...state,
        audioTime: action.audioTime,
        currentTime: newCurrentTime,
        currentSpanIndex: spanIndex,
      };
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
    case ON_CLICK_AUDIO_TEXT_EDITOR:
      //document.getElementById("audio-player").currentTime = spans[spanIndex]['startTime'];
      return state;
    default:
      return state;
  }
};

const audioTextEditorReducer = combineReducers({ audioPlayer, audioControls });

export default audioTextEditorReducer;
