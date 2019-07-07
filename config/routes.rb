Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  resources :users
  resources :sessions, only: [:new, :create, :destroy]
  resources :media_files, only: [:create, :destroy, :show] do
    resources :transcription_edits, only: [:create]
  end
  get 'media_files/:id/download', to: 'media_files#download'
  get 'signup', to: 'users#new', as: 'signup'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
  root 'home#index'
end
