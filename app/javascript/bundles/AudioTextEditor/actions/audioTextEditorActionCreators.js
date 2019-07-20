/* eslint-disable import/prefer-default-export */

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
} from '../constants/audioTextEditorConstants';

export const onCutAudioTextEditor = (startIndex, endIndex) => ({
  startIndex,
  endIndex,
  type: ON_CUT_EDITABLE_HTML,
});

export const onCopyAudioTextEditor = (startIndex, endIndex) => ({
  startIndex,
  endIndex,
  type: ON_COPY_EDITABLE_HTML,
});

export const onPasteAudioTextEditor = (index) => ({
  index,
  type: ON_PASTE_EDITABLE_HTML,
});

export const onClickAudioTextEditor = (index) => ({
  index,
  type: ON_CLICK_AUDIO_TEXT_EDITOR,
});

export const onDeleteAudioTextEditor = (startIndex, endIndex) => ({
  type: ON_DELETE_EDITABLE_HTML,
  startIndex, 
  endIndex,
});

export const updateAudioTime = (audioTime) => ({
  type: AUDIO_TIME_UPDATE,
  audioTime,
});

export const togglePlay = () => ({ type: AUDIO_CONTROLS_TOGGLE_PLAY });

const requestSaveAudioText = () => ({ type: REQUEST_SAVE_AUDIO_TEXT });
const requestSaveAudioTextSuccess = () => ({ type: REQUEST_SAVE_AUDIO_TEXT_SUCCESS });
const requestSaveAudioTextFailed = () => ({ type: REQUEST_SAVE_AUDIO_TEXT_FAILED });

export const saveEdits = () => {
  return (dispatch, getState) => {
    dispatch(requestSaveAudioText());
    const state = getState();
    const headers = {
      'Content-Type':'application/json',
      'Accept': 'application/json',
    }

    return fetch(`/media_files/${state.audioPlayer.id}/transcription_edits`, {
      method: 'post',
      headers: ReactOnRails.authenticityHeaders(headers),
      body: JSON.stringify({
        transcription_edit: {
          transcription: state.audioPlayer.wordTimes,
        },
      }),
    }).then(
      response => response.json(),
      error => dispatch(requestSaveAudioTextFailed())
    ).then(json => {
      dispatch(requestSaveAudioTextSuccess(json));
    });
  }
}

export const downloadEdits = () => {
  return (dispatch, getState) => {
    const state = getState();
    window.open(`/media_files/${state.audioPlayer.id}/download`, '_blank');
  }
}
