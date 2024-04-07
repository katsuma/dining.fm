require "addressable/uri"
require_relative "base"

class Service::Apple < Service::Base
  def self.name
    "apple"
  end

  def self.url
    "https://podcasts.apple.com/us/podcast/id1668849655"
  end

  def self.episode_selector
    "ol.tracks li a"
  end

  def self.id_from_element(element)
    link = element.attribute("href")
    Addressable::URI.parse(link).query_values["i"]
  end

  def self.title_from_element(element)
    element.text.strip
  end
end
