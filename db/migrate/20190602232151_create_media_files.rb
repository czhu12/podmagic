class CreateMediaFiles < ActiveRecord::Migration[5.1]
  def change
    create_table :media_files do |t|
      t.integer :user_id

      t.timestamps
    end
  end
end
