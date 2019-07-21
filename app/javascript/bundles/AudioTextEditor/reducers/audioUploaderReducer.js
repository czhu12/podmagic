import { combineReducers } from 'redux';
import {
  REQUEST_UPDATE_UPLOADING_STATE,
  REQUEST_UPDATE_UPLOADING_STATE_SUCCESS,
  REQUEST_UPDATE_UPLOADING_STATE_FAILED,
} from '../constants/audioUploaderConstants';

const reducer = (
  state = {
    mediaFile: {
      id: null,
      transcribed: false,
      uploaded: false,
      transcription: [],
      file: {
        url: null
      },
    },
    fetching: false,
    needsToUpload: false,
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_UPDATE_UPLOADING_STATE:
      return {...state, fetching: true};
    case REQUEST_UPDATE_UPLOADING_STATE_SUCCESS:
      return {...state, mediaFile: action.mediaFile, fetching: false};
    case REQUEST_UPDATE_UPLOADING_STATE_FAILED:
      return {...state, fetching: false};
    default:
      return state;
  }
};

export default reducer;
