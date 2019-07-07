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

  def edit(input_audio_file, output_path, spans)
    audio = FFMPEG::Movie.new(input_audio_file)
    edit_audio(audio, output_path, spans)
  end

  def edit_audio(audio, output_path, spans)
    # TODO: refactor this so it can be tested
    basename_without_extension = File.basename(output_path, ".*")

    # Create all the span times.
    span_files = []
    spans.each_with_index do |span, index|
      start_time = span[:startTime]
      end_time = span[:endTime]
      diff = readable_time_from_seconds(end_time - start_time)
      # TODO: refactor this so it can be tested
      span_filename = "/tmp/#{basename_without_extension}-span-#{index}.flac"
      save_span_file(audio, span_filename, readable_time_from_seconds(start_time), diff)
      span_files << span_filename
    end

    join_files_together(span_files, output_path)
  end

  def save_span_file(audio, span_filename, start_time, diff)
    audio.transcode(span_filename, %W(-ss #{start_time} -c copy -t #{diff}))
  end

  def join_files_together(span_files, output_path)
    # Join the spans back together.
    # https://superuser.com/questions/587511/concatenate-multiple-wav-files-using-single-command-without-extra-file
    file_params = (['-i'] * span_files.size).zip(files).flatten
    `ffmpeg #{file_params} -filter_complex '[0:0][1:0][2:0][3:0]concat=n=#{files.size}:v=0:a=1[out]' -map '[out]' #{output_path}`
    status = $?.to_i
    return status == 0
  end
end
