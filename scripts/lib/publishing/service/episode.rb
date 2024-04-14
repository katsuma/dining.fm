require 'json'

class Publishing::Service::Episode
  attr_reader :id
  attr_reader :number

  def initialize(id:, number:)
    @id = id
    @number = number
  end

  def to_json
    {
      id: id,
      number: number,
    }.to_json
  end
end
