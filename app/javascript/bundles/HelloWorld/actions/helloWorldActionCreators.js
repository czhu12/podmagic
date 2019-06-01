/* eslint-disable import/prefer-default-export */

import {
  HELLO_WORLD_NAME_UPDATE,
  AUDIO_TIME_UPDATE,
  ON_CUT_EDITABLE_HTML,
  ON_COPY_EDITABLE_HTML,
  ON_PASTE_EDITABLE_HTML,
  ON_DELETE_EDITABLE_HTML,
} from '../constants/helloWorldConstants';

export const updateName = (name) => ({
  type: HELLO_WORLD_NAME_UPDATE,
  name,
});

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
