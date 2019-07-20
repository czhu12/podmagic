CarrierWave.configure do |config|
  config.fog_credentials = {
    provider: 'Google',
    google_storage_access_key_id: ENV['CLOUD_STORAGE_ACCESS_KEY'],
    google_storage_secret_access_key: ENV['CLOUD_STORAGE_SECRET_KEY']
  }
  config.fog_directory = 'podmagic_production'
end
