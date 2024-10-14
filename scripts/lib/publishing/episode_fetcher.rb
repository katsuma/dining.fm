require "ferrum"
require_relative "service/episode"

class Publishing::EpisodeFetcher
  private attr_reader :service

  DOM_CONTENTED_LOADED_WAIT_TIME = 1
  private_constant :DOM_CONTENTED_LOADED_WAIT_TIME

  def initialize(service)
    @service = service
  end

  def fetch
    browser = Ferrum::Browser.new
    browser.goto(service.url)
    sleep DOM_CONTENTED_LOADED_WAIT_TIME
    episodes = browser.css(service.episode_selector).map do |episode_element|
      Publishing::Service::Episode.new(
        id: service.id_from_element(episode_element),
        number: service.number_from_element(episode_element),
      )
    end
    episodes
  ensure
    browser.quit
  end
end
