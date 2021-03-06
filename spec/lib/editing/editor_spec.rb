require 'rails_helper'
class MockFFMPEGMovie
end
describe Editing::Editor do

  let(:word0) {
    {
      word_id: 0,
      start_time: 0.25,
      end_time: 0.5,
      start_padding: 0.25,
      end_padding: 0.75,
    }
  }
  let(:word1) {
    {
      word_id: 1,
      start_time: 1,
      end_time: 2,
      start_padding: 0.75,
      end_padding: 2.5,
    }
  }
  let(:word2) {
    {
      word_id: 2,
      start_time: 3,
      end_time: 4,
      start_padding: 2.5,
      end_padding: 3.5,
    }
  }
  let(:word3) {
    {
      word_id: 3,
      start_time: 5,
      end_time: 6,
      start_padding: 4.5,
      end_padding: 6.5,
    }
  }
  let(:word4) {
    {
      word_id: 4,
      start_time: 7,
      end_time: 8,
      start_padding: 6.5,
      end_padding: 8,
    }
  }
  let(:sorted_word_times) { [word0, word1, word2, word3, word4] }
  let(:span1) {
    {
      totalTime: 3,
      startIndex: 0,
      endIndex: 2,
      startTime: 0,
      endTime: 3,
    }
  }

  let(:span2) {
    {
      totalTime: 15.9,
      startIndex: 3,
      endIndex: 33,
      startTime: 3.8,
      endTime: 19.7,
    }
  }

  let(:spans) { [span1, span2] }
  let(:editor) { described_class.new }
  let(:audio) { MockFFMPEGMovie.new }

  it "correctly calls javascript findContiguousWordSpans" do
    response = editor.time_spans(sorted_word_times, sorted_word_times)
    expect(response).to eq([{
      startIndex: 0,
      endIndex: 4,
      startTime: 0,
      endTime: 8,
      totalTime: 8,
    }])
  end

  it 'calls the editing APIs correctly' do
    expect(editor).to receive(:save_span_file).with(
      audio,
      '/tmp/output-span-0.flac',
      '00:00:0.0',
      '00:00:3.0',
    )
    expect(editor).to receive(:save_span_file).with(
      audio,
      '/tmp/output-span-1.flac',
      '00:00:3.8',
      '00:00:15.9',
    )
    expect(editor).to receive(:join_files_together).with(
      [
        '/tmp/output-span-0.flac',
        '/tmp/output-span-1.flac',
      ],
      '/tmp/output.flac',
    )
    editor.edit_audio(audio, '/tmp/output.flac', spans)
  end
end
