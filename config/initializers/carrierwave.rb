if Rails.env.production?
  CarrierWave.configure do |config|
    config.storage                             = :gcloud
    config.gcloud_bucket                       = 'podmagic'
    config.gcloud_bucket_is_public             = true
    config.gcloud_authenticated_url_expiration = 600
    config.gcloud_content_disposition          = 'attachment'
    
    config.gcloud_attributes = {
      expires: 600
    }
    
    config.gcloud_credentials = {
      gcloud_project: 'poised-ceiling-241623',
      gcloud_keyfile: ENV['GOOGLE_APPLICATION_CREDENTIALS']
    }
  end
else
  CarrierWave.configure do |config|
    config.storage = :file
  end
end
