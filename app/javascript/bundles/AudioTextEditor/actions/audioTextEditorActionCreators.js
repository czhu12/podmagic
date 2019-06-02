/* eslint-disable import/prefer-default-export */

import {
  AUDIO_TIME_UPDATE,
  ON_CUT_EDITABLE_HTML,
  ON_COPY_EDITABLE_HTML,
  ON_PASTE_EDITABLE_HTML,
  ON_DELETE_EDITABLE_HTML,
  AUDIO_CONTROLS_TOGGLE_PLAY,
} from '../constants/audioTextEditorConstants';

export const onCutEditableHtml = (html) => ({
  type: ON_CUT_EDITABLE_HTML,
  html,
});

export const onCopyEditableHtml = (html) => ({
  type: ON_COPY_EDITABLE_HTML,
  html,
});

export const onPasteEditableHtml = (html) => ({
  type: ON_PASTE_EDITABLE_HTML,
  html,
});

export const onDeleteEditableHtml = (startIndex, endIndex) => ({
  type: ON_DELETE_EDITABLE_HTML,
  startIndex, 
  endIndex,
});

export const updateAudioTime = (audioTime) => ({
  type: AUDIO_TIME_UPDATE,
  audioTime,
});

export const togglePlay = () => ({ type: AUDIO_CONTROLS_TOGGLE_PLAY });
