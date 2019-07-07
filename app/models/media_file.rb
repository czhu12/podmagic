class MediaFile < ApplicationRecord
  belongs_to :user
  has_many :transcription_edits, :dependent => :delete_all

  mount_uploader :audio_file, AudioFileUploader
end
