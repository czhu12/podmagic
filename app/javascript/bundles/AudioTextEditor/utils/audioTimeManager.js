// We can't import anything in this function because we need to compile and run it with execjs

/**
 * Finds the index of a wordId in a list of sorted wordTimes
 * @param {Array} sortedWordTimes
 * @param {int} wordId
 * @return {int}
 */
const seekToWordId = (sortedWordTimes, wordId) => {
  for (let i = 0; i < sortedWordTimes.length; i++) {
    let wordTime = sortedWordTimes[i];
    if (wordTime['word_id'] == wordId) {
      return i;
    }
  }
  throw `Word with ID ${wordId} not found!`
}

/**
 * Finds the indexes of word times that are not sequential.
 * @param {number} currentTime
 * @param {Array[WordTime]} wordTimes
 * @return {Array[int]}
 */
const findIndexesThatNeedTimeChange = (sortedWordTimes, wordTimes) => {
  /* Preprocess the words to figure out where we should make a time change.
  // Everything that is not monotonically increasing needs to be a word change
  */
  let currentIndex = 0;
  let indexesThatNeedTimeChange = []
  while (currentIndex < wordTimes.length) {
    const wordTime = wordTimes[currentIndex];
    // Seek to corresponding time in sortedWordTimes
    let sortedIndex = seekToWordId(sortedWordTimes, wordTime['word_id']);
    while (currentIndex < wordTimes.length &&
      sortedIndex < sortedWordTimes.length &&
      wordTimes[currentIndex]['word_id'] === sortedWordTimes[sortedIndex]['word_id']) {
      currentIndex++;
      sortedIndex++;
    }

    indexesThatNeedTimeChange.push(currentIndex - 1);
    //if (currentIndex < wordTimes.length &&
    //  sortedIndex < sortedWordTimes.length &&
    //  wordTimes[currentIndex]['word_id'] !== sortedWordTimes[sortedIndex]['word_id']) {
    //  indexesThatNeedTimeChange.push(currentIndex);
    //}
  }
  return indexesThatNeedTimeChange
}

const computeTimeOfSpan = (wordTimes, startIndex, endIndex) => {
  return wordTimes[endIndex]['end_padding'] - wordTimes[startIndex]['start_padding'];
}

/**
 * Finds the index of a wordId in a list of sorted wordTimes
 * @param {Array} sortedWordTimes
 * @param {int} wordId
 * @return {int}
 */
const findContiguousWordSpans = (sortedWordTimes, wordTimes) => {
  const indexesThatNeedTimeChange = findIndexesThatNeedTimeChange(sortedWordTimes, wordTimes);
  let startTime = null;
  if (wordTimes[0]['word_id'] === 0) {
    // If we are in the first original span, then the start time should be 0;
    startTime = 0;
  } else {
    startTime = wordTimes[0]['start_padding'];
  }

  let spans = [{
    startIndex: 0,
    endIndex: indexesThatNeedTimeChange[0],
    startTime: startTime,
    endTime: wordTimes[indexesThatNeedTimeChange[0]]['end_padding'],
    totalTime: wordTimes[indexesThatNeedTimeChange[0]]['end_padding'] - startTime,
  }];

  for (let i = 0; i < indexesThatNeedTimeChange.length - 1; i++) {
    spans.push({
      startIndex: indexesThatNeedTimeChange[i] + 1,
      endIndex: indexesThatNeedTimeChange[i+1],
      startTime: wordTimes[indexesThatNeedTimeChange[i] + 1]['start_padding'],
      endTime: wordTimes[indexesThatNeedTimeChange[i + 1]]['end_padding'],
      totalTime: wordTimes[indexesThatNeedTimeChange[i + 1]]['end_padding'] - wordTimes[indexesThatNeedTimeChange[i] + 1]['start_padding']
    });
  }
  return spans;
}

const findSpanIndex = (currentTime, spans) => {
  // add up relative word times together and stitch together
  for (let i = 0; i < spans.length; i++) {
    currentTime -= spans[i]['totalTime'];
    if (currentTime < 0) {
      return i;
    }
  }
  return -1;
}

const findSpanIndexOfWordTime = (wordTimeIndex, spans) => {
  for (let i = 0; i < spans.length; i++) {
    const span = spans[i];
    if (wordTimeIndex >= span['startIndex'] && wordTimeIndex <= span['endIndex']) {
      return i;
    }
  }
  throw new `${wordTimeIndex} word index exceeds spans.`
}

const calculateCurrentTime = (sortedWordTimes, wordTimes, currentTime, audioTime) => {
  const spans = findContiguousWordSpans(sortedWordTimes, wordTimes);
  // All finished spans total time + audioTime - currentSpanStartTime
  const spanIndex = findSpanIndex(currentTime, spans);
  let totalTimeSum = 0.0;
  // sum up total times for all spans up to spanIndex - 1
  for (let i = 0; i < spanIndex; i++) {
    totalTimeSum += spans[i]['totalTime'];
  }

  let newCurrentTime = null;
  if (spanIndex === 0 && wordTimes[0]['word_id'] === 0) {
    // We are playing the first span and its the original first span.
    newCurrentTime = audioTime;
  } else {
    newCurrentTime = totalTimeSum + audioTime - spans[spanIndex]['startTime'] + 0.0001; // the 0.0001 is to prevent this .99999 number representation bug
  }
  if (newCurrentTime < currentTime) {
    console.error('newCurrentTime went backwards!')
  }
  return newCurrentTime;
}

// ==========
export { findSpanIndex, calculateCurrentTime, findSpanIndexOfWordTime, findContiguousWordSpans, findIndexesThatNeedTimeChange }
