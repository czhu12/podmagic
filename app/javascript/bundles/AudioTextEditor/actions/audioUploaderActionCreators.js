/* eslint-disable import/prefer-default-export */

import {
  REQUEST_UPDATE_UPLOADING_STATE,
  REQUEST_UPDATE_UPLOADING_STATE_SUCCESS,
  REQUEST_UPDATE_UPLOADING_STATE_FAILED,
} from '../constants/audioUploaderConstants';

const requestUpdateUploadingStateSuccess = (mediaFile) => ({
  mediaFile: mediaFile,
  type: REQUEST_UPDATE_UPLOADING_STATE_SUCCESS,
});

const requestUpdateUploadingStateFailed = () => ({
  type: REQUEST_UPDATE_UPLOADING_STATE_FAILED,
});

const requestUpdateUploadingState = () => ({
  type: REQUEST_UPDATE_UPLOADING_STATE,
});

export const updateUploadingState = () => {
  return (dispatch, getState) => {
    dispatch(requestUpdateUploadingState());
    const state = getState();
    const headers = {
      'Content-Type':'application/json',
      'Accept': 'application/json',
    }

    return fetch(`/media_files/${state.mediaFile.id}.json`, {
      method: 'get',
      headers: ReactOnRails.authenticityHeaders(headers),
    }).then(
      response => response.json(),
      error => dispatch(requestUpdateUploadingStateFailed())
    ).then(json => {
      dispatch(requestUpdateUploadingStateSuccess(json));
    });
  }
}
