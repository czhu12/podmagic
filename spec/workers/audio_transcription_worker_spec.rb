require 'rails_helper'
describe AudioTranscriptionWorker do
  let(:audio_transcription_worker) { AudioTranscriptionWorker.new }
  let(:transcription) do
    [
      {
        word_id: 0,
        word: 'hello',
        start_time: 0.5,
        end_time: 0.7,
      },
      {
        word_id: 1,
        word: 'my',
        start_time: 3.0,
        end_time: 3.2,
      },
      {
        word_id: 2,
        word: 'name',
        start_time: 3.4,
        end_time: 3.5,
      },
      {
        word_id: 3,
        word: 'is',
        start_time: 3.5,
        end_time: 3.8,
      },
      {
        word_id: 4,
        word: 'chris',
        start_time: 3.9,
        end_time: 4.1,
      },
    ]
  end

  it 'correctly adds padding times transcription' do
    padded_transcription = audio_transcription_worker.add_word_padding(transcription)
    expect(padded_transcription[0][:start_padding]).to eq(0.5)
    expect(padded_transcription[-1][:end_padding]).to eq(4.1)

    expect(padded_transcription[1][:end_padding]).to eq(3.3)
    expect(padded_transcription[3][:end_padding]).to be_within(0.001).of(3.85)

    expect(padded_transcription[0][:end_padding]).to eq(0.7 + AudioTranscriptionWorker::MAX_PADDING)
    expect(padded_transcription[2][:end_padding]).to eq(3.5)
  end
end
