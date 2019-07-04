import {
  findIndexesThatNeedTimeChange,
  findContiguousWordSpans,
  findSpanIndex,
} from '../utils/audioTimeManager';

const word0 = {
  word_id: 0,
  start_time: 0.25,
  end_time: 0.5,
  start_padding: 0.25,
  end_padding: 0.75,
};
const word1 = {
  word_id: 1,
  start_time: 1,
  end_time: 2,
  start_padding: 0.75,
  end_padding: 2.5,
};
const word2 = {
  word_id: 2,
  start_time: 3,
  end_time: 4,
  start_padding: 2.5,
  end_padding: 3.5,
};
const word3 = {
  word_id: 3,
  start_time: 5,
  end_time: 6,
  start_padding: 4.5,
  end_padding: 6.5,
};
const word4 = {
  word_id: 4,
  start_time: 7,
  end_time: 8,
  start_padding: 6.5,
  end_padding: 8,
};
const sortedWordTimes = [word0, word1, word2, word3, word4];

test('Finds indexes that need playhead change', () => {
  const indexesThatNeedTimeChange = findIndexesThatNeedTimeChange(sortedWordTimes, data1);
  expect(indexesThatNeedTimeChange).toEqual([ 1, 2, 4 ]);
});

const data1 = [word0, word1, word4, word2, word3];
test('Finds spans in cut word', () => {
  const spans = findContiguousWordSpans(sortedWordTimes, data1);
  expect(spans).toEqual([
    {
      startIndex: 0,
      endIndex: 1,
      startTime: 0.25,
      endTime: 2.5,
      totalTime: 2.25,
    },
    {
      startIndex: 2,
      endIndex: 2,
      startTime: 6.5,
      endTime: 8,
      totalTime: 1.5,
    },
    {
      startIndex: 3,
      endIndex: 4,
      startTime: 2.5,
      endTime: 6.5,
      totalTime: 4,
    },
  ]);
});

const data2 = [word0, word1, word2, word3, word4];
test('Finds spans in unchanged', () => {
  const indexesThatNeedTimeChange = findIndexesThatNeedTimeChange(sortedWordTimes, data2);
  expect(indexesThatNeedTimeChange).toEqual([4]);
  const spans = findContiguousWordSpans(sortedWordTimes, data2);
  expect(spans).toEqual([
    {
      startIndex: 0,
      endIndex: 4,
      startTime: 0.25,
      endTime: 8,
      totalTime: 7.75,
    },
  ]);
});

const data3 = [word0, word1, word3, word4];
test('Finds spans in deleted word', () => {
  const indexesThatNeedTimeChange = findIndexesThatNeedTimeChange(sortedWordTimes, data3);
  expect(indexesThatNeedTimeChange).toEqual([1, 3]);
  const spans = findContiguousWordSpans(sortedWordTimes, data3);
  expect(spans).toEqual([
    {
      startIndex: 0,
      endIndex: 1,
      startTime: 0.25,
      endTime: 2.5,
      totalTime: 2.25,
    },
    {
      startIndex: 2,
      endIndex: 3,
      startTime: 4.5,
      endTime: 8,
      totalTime: 3.5,
    },
  ]);
});

const data4 = [word0, word1, word2, word1, word3, word4];
test('Finds spans in added word', () => {
  const indexesThatNeedTimeChange = findIndexesThatNeedTimeChange(sortedWordTimes, data4);
  expect(indexesThatNeedTimeChange).toEqual([2, 3, 5]);
  const spans = findContiguousWordSpans(sortedWordTimes, data4);
  expect(spans).toEqual([
    {
      endIndex: 2,
      endTime: 3.5,
      startIndex: 0,
      startTime: 0.25,
      totalTime: 3.25,
    },
    {
      endIndex: 3,
      endTime: 2.5,
      startIndex: 3,
      startTime: 0.75,
      totalTime: 1.75,
    },
    {
      endIndex: 5,
      endTime: 8,
      startIndex: 4,
      startTime: 4.5,
      totalTime: 3.5,
    },
  ]);
});

test('Gets current span index', () => {
  const spans = findContiguousWordSpans(sortedWordTimes, data1);
  expect(findSpanIndex(3.0, spans)).toEqual(1);
  expect(findSpanIndex(2.0, spans)).toEqual(0);
  expect(findSpanIndex(5.0, spans)).toEqual(2);
});
