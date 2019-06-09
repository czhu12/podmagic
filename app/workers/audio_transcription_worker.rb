class AudioTranscriptionWorker
  include Sidekiq::Worker

  def perform(*args)
    media_file_id = args[0]["media_file_id"]
    media_file = MediaFile.find(media_file_id)
    if media_file.transcription
      Rails.logger.log("Media File #{media_file.id} has already been transcribed.")
    end
    transcription = transcribe(media_file.audio_file)
    media_file.update(transcription: transcription)
  end

  def transcribe(file)
    words = "hello world this is a demo text transcription".split
    current_time = 0
    words.map do |word|
      current_time += Random.rand(20..60) / 100.to_f
      start_time = current_time
      current_time += Random.rand(20..60) / 100.to_f
      end_time = current_time
      {
        word: word,
        start_time: start_time,
        end_time: end_time,
      }
    end
  end
end
