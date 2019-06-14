require "google/cloud/speech"

speech_client = Google::Cloud::Speech.new(timeout: 10000)
file_name = '/tmp/demo.flac'

# Loads the audio into memory
audio = nil
File.open(file_name, 'rb') do |io|
	content = io.read
	audio = Google::Cloud::Speech::V1::RecognitionAudio.new(content: content)
end

config = Google::Cloud::Speech::V1::RecognitionConfig.new(
    encoding: Google::Cloud::Speech::V1::RecognitionConfig::AudioEncoding::FLAC,
    sample_rate_hertz: 44100,
    language_code: 'en-US',
    enable_word_time_offsets: true)

operation = speech_client.long_running_recognize(config, audio) do |op|
  raise op.results.message if op.error?
  puts op.results.results
  op.results.results.each do |result|
    alternative = result.alternatives[0]
    alternative.words.each do |word_info|
        word = word_info.word
        start_time = word_info.start_time
        end_time = word_info.end_time
        puts("Word: #{word}, start_time: #{start_time.seconds + start_time.nanos * 1e-9}, end_time: #{end_time.seconds + end_time.nanos * 1e-9}")
    end
  end
end
operation.wait_until_done!
