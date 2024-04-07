require 'json'

class Episode
  attr_reader :service
  attr_reader :title
  attr_reader :id

  def initialize(service:, id:, title:)
    @service = service
    @id = id
    @title = title
  end

  def to_json
    {
      service: service,
      id: id,
      title: title,
    }.to_json
  end
end
