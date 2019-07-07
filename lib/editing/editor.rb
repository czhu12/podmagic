class Editing::Editor
  include Editing::TimeHelper
  def initialize
    source = File.read(Rails.root.join("app/javascript/bundles/AudioTextEditor/utils/audioTimeManager.js"))
    # This gets rid of the `export` statement at the very end of the file, which apparently ExecJS can't handle
    source = source.split('=' * 10)[0]
    @context = ExecJS.compile(source)
  end

  def time_spans(sorted_word_times, word_times)
    spans = @context.call("findContiguousWordSpans", sorted_word_times, word_times)
    spans.map { |s| s.deep_symbolize_keys }
  end

  def edit(path, spans)
    # TODO: refactor this so it can be tested
    audio = FFMPEG::Movie.new(path)
    basename_without_extension = File.basename(path, ".*")

    # Create all the span times.
    files = []
    spans.each_with_index do |span, index|
      span_filename = "/tmp/#{basename_without_extension}-span-#{index}.flac"
      start_time = span["startTime"]
      end_time = span["endTime"]
      end_time - start_time
      diff = readable_time_from_seconds(end_time - start_time)
      # TODO: refactor this so it can be tested
      audio.transcode(span_filename, %W(-ss #{start_time} -c copy -t #{diff}))
      files << span_filename
    end

    # Join the spans back together.
    # https://superuser.com/questions/587511/concatenate-multiple-wav-files-using-single-command-without-extra-file
    file_params = (['-i'] * files.size).zip(files).flatten
    `ffmpeg #{file_params} -filter_complex '[0:0][1:0][2:0][3:0]concat=n=#{files.size}:v=0:a=1[out]' -map '[out]' output.wav`
    status = $?.to_i
    return status == 0
  end
end
