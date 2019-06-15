class TranscriptionEdit < ApplicationRecord
  belongs_to :media_file

  validates_presence_of :transcription
end
