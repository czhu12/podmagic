class AddTranscriptionToMediaFiles < ActiveRecord::Migration[5.2]
  def change
    add_column :media_files, :transcription, :json
  end
end
