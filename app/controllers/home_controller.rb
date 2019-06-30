class HomeController < ApplicationController
  def index
    if current_user
      @media_files_to_display = [MediaFile.new] + current_user.media_files.to_a
      render 'home/index'
    else
      render 'home/landing_page', layout: 'landing_page'
    end
  end
end
