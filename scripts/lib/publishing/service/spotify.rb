require_relative "base"

class Publishing::Service::Spotify < Publishing::Service::Base
  def self.name
    "spotify"
  end

  def self.url
    "https://open.spotify.com/show/3wSB2J20uqON5nPhCmMia5"
  end

  def self.episode_selector
    "div[data-testid='infinite-scroll-list'] a[href^='/episode']"
  end

  def self.id_from_element(element)
    element.attribute("href").split("/").last
  end

  def self.number_from_element(element)
    element.css("div")[0].text.strip.match(/\A[0-9]+/)[0].to_i
  end
end
