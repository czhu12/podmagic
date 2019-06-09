class MediaFilesController < ApplicationController
  before_action :authenticate
  before_action :set_media_file, only: [:show, :edit, :update, :destroy]

  def create
    media_file = MediaFile.new(params.require(:media_file).permit(:title))
    media_file.audio_file.attach(params[:media_file][:audio_file][0])
    media_file.user = current_user
    if media_file.save
      AudioTranscriptionWorker.perform_async(media_file_id: media_file.id)
      redirect_to media_file
    else
      flash[:notice] = "Media file save failed."
      redirect_to root_url
    end
  end

  def show
    @audio_text_editor_props = {
      audioPlayer: {
        wordTimes: JSON.dump(@media_file.transcription || []),
        audioTime: 0,
        title: @media_file.title
      }
    }
  end

  private
  def set_media_file
    @media_file = MediaFile.find(params[:id])
  end
end
