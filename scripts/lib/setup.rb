require 'dotenv'
require 'openai'
require 'pinecone'
require 'sqlite3'

require_relative 'importer'
require_relative 'models/episode'

Dotenv.load
ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',
  database: 'db/diningfm.sqlite',
)

OpenAI.configure do |config|
  config.access_token = ENV.fetch("OPENAI_ACCESS_TOKEN")
end

Pinecone.configure do |config|
  config.api_key  = ENV.fetch('PINECONE_API_KEY')
end
