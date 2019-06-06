class HomeController < ApplicationController
  def index
    if current_user
      @media_file = MediaFile.new
      render 'home/index'
    else
      render 'home/landing_page'
    end
  end
end
