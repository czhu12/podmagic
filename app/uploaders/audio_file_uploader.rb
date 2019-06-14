class AudioFileUploader < CarrierWave::Uploader::Base
  storage :file
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  #version :flac do
  #  convert_file
  #end

  #def convert_file(input_file_path, output_file_path)
  #  audio = FFMPEG::Movie.new('public/demo.mp3')
  #  options = {
  #    audio_codec: "flac",
  #    audio_bitrate: 32,
  #    audio_sample_rate: 44100,
  #    audio_channels: 1,
  #    threads: 2,
  #  }

  #  transcoded_audio = audio.transcode("/tmp/demo.flac", options)
  #end
end
