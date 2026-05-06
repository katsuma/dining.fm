require 'dotenv'
require 'openai'
require 'pinecone'

require_relative 'importer'
require_relative 'models/episode'

Dotenv.load
ActiveRecord::Base.establish_connection(ENV.fetch('POSTGRES_URL'))

# Suppress "unknown OID" warning for pg_vector type by registering it as text
begin
  result = ActiveRecord::Base.connection.execute("SELECT oid FROM pg_type WHERE typname = 'vector'")
  if (oid = result.first&.[]('oid')&.to_i) && oid > 0
    ActiveRecord::Base.connection.raw_connection.type_map_for_results
      .add_coder(PG::TextDecoder::String.new(name: 'vector', oid: oid))
  end
rescue => e
  # ignore if pg_vector is not available
end

OpenAI.configure do |config|
  config.access_token = ENV.fetch("OPENAI_ACCESS_TOKEN")
end

Pinecone.configure do |config|
  config.api_key  = ENV.fetch('PINECONE_API_KEY')
end
