class AudioFileUploader < CarrierWave::Uploader::Base
  include CarrierWave::Video
  storage :fog

  process :encode_audio => [:flac]

  def store_dir
  end

  def filename
    "#{model.title}-#{Time.now.strftime("%F_%H-%M-%S")}.flac".gsub(' ', '_')
  end

  def encode_audio(format='flac')
    # move upload to local cache
    cache_stored_file! if !cached?

    directory = File.dirname(current_path)

    # move upload to tmp file - encoding result will be saved to
    # original file name
    tmp_path = File.join(directory, 'tmpfile')
    File.rename(current_path, tmp_path)

    # encode
    # Voyeur::Video.new(filename: tmp_path).convert(to: format.to_sym, output_filename: current_path)
    audio = FFMPEG::Movie.new(tmp_path)
    options = {
      audio_channels: 1,
      audio_sample_rate: 44100,
      threads: 2,
    }
    basename = File.basename(current_path, '.*')
    new_path = File.join(directory, basename)
    audio.transcode("#{new_path}.#{format.to_s}", options)

    # because encoding video will change file extension, change it to old one
    File.rename("#{new_path}.#{format.to_s}", current_path)

    # delete tmp file
    File.delete(tmp_path)
  end
end
