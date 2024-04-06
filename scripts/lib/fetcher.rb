require "ferrum"
require_relative "episode"

class Fetcher
  attr_reader :service

  def initialize(service)
    @service = service
  end

  def fetch
    browser = Ferrum::Browser.new
    browser.goto(service.url)
    episodes = browser.css(service.episode_selector).map do |episode_element|
      Episode.new(
        service: service.name,
        id: service.id_from_element(episode_element),
        title: service.title_from_element(episode_element),
      )
    end
    episodes
  ensure
    browser.quit
  end
end
