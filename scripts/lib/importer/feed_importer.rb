require 'httparty'
require 'feedjira'
require 'logger'
require_relative '../models/episode'

class Importer::FeedImporter
  FEED_URL = "https://anchor.fm/s/d89790f4/podcast/rss".freeze
  TITLE_TRIMMED_STRING_REGEXP = /\A[0-9]+\.\s?/.freeze
  SUMMARY_TRIMMED_STRING_REGEXP = /<p>各プラットフォームのURLはこちらから(.)+<\/p>/m.freeze

  def self.logger
    @logger ||= Logger.new(STDOUT)
  end

  def self.import!(episode_number = 0)
    xml = HTTParty.get(FEED_URL).body
    feed = Feedjira.parse(xml)

    entries = feed.entries
    entries.select! { |entry| entry.itunes_episode.to_i == episode_number } if episode_number > 0
    logger.info "Importing #{feed.entries.size} entries"

    entries.map do |entry|
      episode = Episode.find_or_initialize_by(
        id: entry.itunes_episode.to_i,
        guid: entry.id,
      )
      ActiveRecord::Base.transaction do
        episode.title = entry.title.gsub(TITLE_TRIMMED_STRING_REGEXP, '').strip
        episode.published_at = entry.published
        episode.enclosure_url = entry.enclosure_url
        episode.enclosure_length = entry.enclosure_length
        episode.enclosure_type = entry.enclosure_type
        episode.description = entry.summary.gsub(SUMMARY_TRIMMED_STRING_REGEXP, '').strip
        episode.explicit = entry.itunes_explicit != "No"
        episode.duration = entry.itunes_duration
        episode.image_url = entry.itunes_image
        episode.season = entry.itunes_season.to_i
        episode.number = entry.itunes_episode.to_i
        episode.episode_type = entry.itunes_episode_type

        episode.save!
        logger.info "Imported episode #{episode.number} - #{episode.title}"

        episode
      end
    end
  end
end
