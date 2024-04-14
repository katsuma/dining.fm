require 'dotenv'

require_relative 'importer'
require_relative 'models/episode'

Dotenv.load
ActiveRecord::Base.establish_connection(ENV.fetch('POSTGRES_URL'))
