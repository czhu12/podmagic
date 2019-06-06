Rails.application.routes.draw do
  get 'audio_text_editor', to: 'audio_text_editor#index'

  resources :users
  resources :sessions, only: [:new, :create, :destroy]
  resources :media_files
  get 'signup', to: 'users#new', as: 'signup'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
  root 'home#index'
end
