class MediaFilesController < ApplicationController
  before_action :authenticate
  before_action :set_media_file, only: [:show, :edit, :update, :destroy]

  def create
    media_file = MediaFile.new(params.require(:media_file).permit(:title))
    media_file.audio_file = params[:media_file][:audio_file][0]
    media_file.user = current_user

    # First we need to encode into mono-cut-flac file.
    if media_file.save
      AudioTranscriptionWorker.perform_async(media_file_id: media_file.id)
      redirect_to media_file
    else
      media_file.errors.each do |err|
        puts err
      end
      flash[:notice] = "Media file save failed."
      redirect_to root_url
    end
  end

  def show
    original_transcription = @media_file.transcription
    transcription = @media_file.transcription
    if @media_file.transcription_edits.any?
      transcription = @media_file.transcription_edits.last.transcription
    end
    @audio_text_editor_props = {
      audioPlayer: {
        wordTimes: JSON.dump(transcription || []),
        sortedWordTimes: JSON.dump(original_transcription || []),
        audioTime: 0,
        title: @media_file.title,
        audioSrc: @media_file.audio_file.url,
        audioTime: 0,
        currentTime: 0,
        currentSpanIndex: 0,
        id: @media_file.id,
      }
    }
  end

  def destroy
    if @media_file.destroy
      flash[:notice] = "Deleted #{@media_file.title}"
      redirect_to root_url
    end
  end

  private
  def set_media_file
    @media_file = MediaFile.find(params[:id])
  end
end
