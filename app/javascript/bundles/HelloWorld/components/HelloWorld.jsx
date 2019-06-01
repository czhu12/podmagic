import PropTypes from 'prop-types';
import React from 'react';
import ContentEditable from 'react-contenteditable'

const isBetween = (current, start, end) => {
  return current >= start && current <= end;
}

const HelloWorld = ({
  audioPlayer,
  onCutEditableHtml,
  onCopyEditableHtml,
  onPasteEditableHtml,
  onDeleteEditableHtml }) => {
  const wordTimes = audioPlayer.wordTimes;
  const wordsArray = wordTimes.filter(word => !word['deleted']).map((word, index) => {
    const startTime = word['start_time'];
    const endTime = word['end_time'];
    const audioTime = audioPlayer.audioTime;
    //if (isBetween(audioTime, startTime, endTime)) {
    //  return `<span data-index=${index} class='current-word'>${word['word']}</span>`;
    //}
    //return `<span data-index=${index}>${word['word']}</span>`;
    return word['word'];
  });
  //const wordsHtml = wordsArray.join(' ');

  return (
		<div className="wrapper">
			<h1>Highlight Within Textarea v2</h1>
      <ContentEditable
        html={wordsArray.join(' ')}
        className='no-select'
        disabled={false}       // use true to disable editing
        onKeyDown={onDeleteEditableHtml} // handle innerHTML change
        onCut={onCutEditableHtml}
        onCopy={onCopyEditableHtml}
        onPaste={onPasteEditableHtml}
      />
		</div>
  );
}

HelloWorld.propTypes = {
  audioPlayer: PropTypes.object.isRequired,
  onDeleteEditableHtml: PropTypes.func.isRequired,
};

export default HelloWorld;
