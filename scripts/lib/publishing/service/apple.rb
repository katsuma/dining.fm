require "addressable/uri"
require_relative "base"

class Publishing::Service::Apple < Publishing::Service::Base
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

  def self.number_from_element(element)
    element.text.strip.match(/\A[0-9]+/)[0].to_i
  end
end
