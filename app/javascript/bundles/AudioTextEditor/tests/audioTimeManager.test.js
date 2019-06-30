import {
  findIndexesThatNeedTimeChange,
  findContiguousWordSpans,
  findSpanIndex,
} from '../utils/audioTimeManager';

const data1 = [
  {
    word_id: 0,
    start_time: 0.25,
    end_time: 0.5,
    start_padding: 0.25,
    end_padding: 0.75,
  }, //0
  {
    word_id: 1,
    start_time: 1,
    end_time: 2,
    start_padding: 0.75,
    end_padding: 2.5,
  }, //1
  {
    word_id: 4,
    start_time: 7,
    end_time: 8,
    start_padding: 6.5,
    end_padding: 8,
  }, //2
  {
    word_id: 2,
    start_time: 3,
    end_time: 4,
    start_padding: 2.5,
    end_padding: 3.5,
  }, //3
  {
    word_id: 3,
    start_time: 5,
    end_time: 6,
    start_padding: 4.5,
    end_padding: 6.5,
  }, //4
];

test('Finds indexes that need playhead change', () => {
  const indexesThatNeedTimeChange = findIndexesThatNeedTimeChange(data1);
  expect(indexesThatNeedTimeChange).toEqual([ 1, 2, 4 ]);
});

test('Finds all contiguous word spans', () => {
  const spans = findContiguousWordSpans(data1);
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

test('Gets current span index', () => {
  const spans = findContiguousWordSpans(data1);
  expect(findSpanIndex(3.0, spans)).toEqual(1);
  expect(findSpanIndex(2.0, spans)).toEqual(0);
  expect(findSpanIndex(5.0, spans)).toEqual(2);
});
