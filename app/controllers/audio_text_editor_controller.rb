# frozen_string_literal: true

class AudioTextEditorController < ApplicationController
  def index
    words = File.read('public/words.json')
    @hello_world_props = { audioPlayer: { wordTimes: words, audioTime: 0 } }
  end
end