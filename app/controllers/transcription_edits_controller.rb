class TranscriptionEditsController < ApplicationController
  before_action :set_media_file, only: [:create]
  def create
    transcription_edit = TranscriptionEdit.new
    transcription_edit.transcription = params[:transcription_edit][:transcription]
    transcription_edit.media_file = @media_file
    if transcription_edit.save
      render :json => { success: true }
    else
      render :json => { success: false }, status: :unprocessable_entity
    end
  end

  private
  def set_media_file
    @media_file = MediaFile.find(params[:media_file_id])
  end
end
