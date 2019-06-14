require 'streamio-ffmpeg'
audio = FFMPEG::Movie.new('public/demo.mp3')
puts audio.duration
puts audio.bitrate
puts audio.audio_stream # "aac, 44100 Hz, stereo, s16, 75 kb/s" (raw audio stream info)
puts audio.audio_codec # "aac"
puts audio.audio_sample_rate # 44100
puts audio.audio_channels # 2

options = {
  audio_codec: "flac",
  audio_bitrate: 32,
  audio_sample_rate: 44100,
  audio_channels: 1,
  threads: 2,
}

transcoded_audio = audio.transcode("/tmp/demo.flac", options)
