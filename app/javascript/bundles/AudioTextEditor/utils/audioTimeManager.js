import { uniqBy } from 'lodash';

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
export const findIndexesThatNeedTimeChange = (sortedWordTimes, wordTimes) => {
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
export const findContiguousWordSpans = (sortedWordTimes, wordTimes) => {
  const indexesThatNeedTimeChange = findIndexesThatNeedTimeChange(sortedWordTimes, wordTimes);
  let spans = [{
    startIndex: 0,
    endIndex: indexesThatNeedTimeChange[0],
    startTime: wordTimes[0]['start_padding'],
    endTime: wordTimes[indexesThatNeedTimeChange[0]]['end_padding'],
  }];

  for (let i = 0; i < indexesThatNeedTimeChange.length - 1; i++) {
    spans.push({
      startIndex: indexesThatNeedTimeChange[i] + 1,
      endIndex: indexesThatNeedTimeChange[i+1],
      startTime: wordTimes[indexesThatNeedTimeChange[i] + 1]['start_padding'],
      endTime: wordTimes[indexesThatNeedTimeChange[i + 1]]['end_padding'],
    });
  }

  spans = spans.map((span) => {
    const totalTime = computeTimeOfSpan(wordTimes, span['startIndex'], span['endIndex']);
    return Object.assign(
      {totalTime: totalTime},
      span,
    );
  })
  return spans;
}

export const findSpanIndex = (currentTime, spans) => {
  // add up relative word times together and stitch together
  for (let i = 0; i < spans.length; i++) {
    currentTime -= spans[i]['totalTime'];
    if (currentTime < 0) {
      return i;
    }
  }
  return -1;
}

export const currentWordToHighlight = (currentTime, wordTimes) => {
  return null;
}

export const findSpanIndexOfWordTime = (wordTimeIndex, spans) => {
  for (let i = 0; i < spans.length; i++) {
    const span = spans[i];
    if (wordTimeIndex >= span['startIndex'] && wordTimeIndex <= span['endIndex']) {
      return i;
    }
  }
  throw new `${wordTimeIndex} word index exceeds spans.`
}

export const calculateCurrentTime = (sortedWordTimes, wordTimes, currentTime, audioTime) => {
  const spans = findContiguousWordSpans(sortedWordTimes, wordTimes);
  // All finished spans total time + audioTime - currentSpanStartTime
  const spanIndex = findSpanIndex(currentTime, spans);
  let totalTimeSum = 0.0;
  // sum up total times for all spans up to spanIndex - 1
  for (let i = 0; i < spanIndex - 1; i++) {
    totalTimeSum += spans[i]['totalTime'];
  }

  if (spanIndex >= 0) {
    console.log(totalTimeSum, audioTime, spans[spanIndex]['startTime']);
    return totalTimeSum + audioTime - spans[spanIndex]['startTime'];
  } else {
    return audioTime;
  }
}
