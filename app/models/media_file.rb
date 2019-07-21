class MediaFile < ApplicationRecord
  belongs_to :user
  has_many :transcription_edits, :dependent => :delete_all

  mount_uploader :audio_file, AudioFileUploader

  def final_word_times
    if transcription_edits.count == 0
      return transcription
    else
      return transcription_edits.last.transcription
    end
  end

  def uploaded
    not audio_file_url.nil?
  end
end
