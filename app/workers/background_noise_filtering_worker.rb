class BackgroundNoiseFilteringWorker
  class CommandFailedError < StandardError; end

  include Sidekiq::Worker
  sidekiq_options retry: 2

  def run_command(input_path, output_path)
    `.virt/bin/python scripts/background_noise_remover.py --input #{input_path} --output #{output_path}`
  end

  def perform(*args)
    # Run the background noise command
    input_path = args[0]["input_path"]
    output_path = args[0]["output_path"]
    result = run_command(input_path, output_path)
    if $?.to_i != 0
      raise CommandFailedError.new("Command failed with #{result}")
    end
    # TODO: Upload this background noise filtered file.
  end
end
