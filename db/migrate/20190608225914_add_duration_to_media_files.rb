class AddDurationToMediaFiles < ActiveRecord::Migration[5.2]
  def change
    add_column :media_files, :duration, :integer, :default => 0
  end
end
