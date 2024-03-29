class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user
  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    else
      @current_user = nil
    end
  end

  def authenticate
    if current_user.nil?
      redirect_to :login
      return false
    end
    return true
  end
end
