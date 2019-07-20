class AudioTranscriptionWorker
  include Sidekiq::Worker
  MAX_PADDING = 1.0

  def perform(*args)
    media_file_id = args[0]["media_file_id"]
    media_file = MediaFile.find(media_file_id)
    if media_file.transcription
      Rails.logger.log("Media File #{media_file.id} has already been transcribed.")
    end
    transcription = transcribe(media_file)
  end

  def google_api(media_file)
    speech_client = Google::Cloud::Speech.new
    url = URI.parse(media_file.audio_file.url)
    uri = "gs:/#{url.path}"
    Rails.logger.debug("Transcribing #{uri}")
    audio = {'uri': uri}

    config = Google::Cloud::Speech::V1::RecognitionConfig.new(
        encoding: Google::Cloud::Speech::V1::RecognitionConfig::AudioEncoding::FLAC,
        sample_rate_hertz: 44100,
        language_code: 'en-US',
        enable_word_time_offsets: true)

    transcription = []
    operation = speech_client.long_running_recognize(config, audio) do |op|
      raise op.results.message if op.error?
      op.results.results.each do |result|
        alternative = result.alternatives[0]
        alternative.words.each_with_index do |word_info, idx|
            word = word_info.word
            start_time = word_info.start_time
            end_time = word_info.end_time
            transcription.append({
              word_id: idx,
              word: word,
              start_time: start_time.seconds + start_time.nanos * 1e-9,
              end_time: end_time.seconds + end_time.nanos * 1e-9,
            })
        end
      end
    end
    operation.wait_until_done!
    transcription
  end

  def add_word_padding(transcription)
    transcription = transcription.map { |w| w.deep_symbolize_keys }
    transcription.each_with_index do |word_info, idx|
      next if idx == 0

      prev = idx - 1
      prev_word_info = transcription[prev]
      difference = word_info[:start_time] - prev_word_info[:end_time]
      padding = [difference / 2, MAX_PADDING].min
      word_info[:start_padding] = word_info[:start_time] - padding
      prev_word_info[:end_padding] = prev_word_info[:end_time] + padding
    end

    transcription[0][:start_padding] = transcription[0][:start_time]
    transcription[-1][:end_padding] = transcription[-1][:end_time]
    transcription
  end

  def transcribe(media_file)
    transcription = google_api(media_file)
    transcription = add_word_padding(transcription)
    media_file.update(transcription: transcription, transcribed: true)
  end
end
