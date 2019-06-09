require "google/cloud/speech"

speech_client = Google::Cloud::Speech.new
language_code = "en-US"
sample_rate_hertz = 44100
encoding = :FLAC
config = {
  language_code: language_code,
  sample_rate_hertz: sample_rate_hertz,
  encoding: encoding
}
uri = "/Users/chriszhu/Documents/Github/podmagic/public/demo-cut-mono.flac"
audio = { uri: uri }
response = speech_client.recognize(config, audio)
