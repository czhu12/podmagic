class AddAudioFileToMediaFiles < ActiveRecord::Migration[5.2]
  def change
    add_column :media_files, :audio_file, :string
  end
end
