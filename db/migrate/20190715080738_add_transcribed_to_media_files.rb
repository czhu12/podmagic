class AddTranscribedToMediaFiles < ActiveRecord::Migration[5.2]
  def change
    add_column :media_files, :transcribed, :boolean, default: false
  end
end
