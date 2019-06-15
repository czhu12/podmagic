class CreateTranscriptionEdits < ActiveRecord::Migration[5.2]
  def change
    create_table :transcription_edits do |t|
      t.integer :media_file_id
      t.json :transcription

      t.timestamps
    end
  end
end
