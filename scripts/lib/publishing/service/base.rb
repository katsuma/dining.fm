class Publishing::Service::Base
  def self.name
    raise NotImplementedError
  end

  def self.url
    raise NotImplementedError
  end

  def self.episode_selector
    raise NotImplementedError
  end

  def self.id_from_element(element)
    raise NotImplementedError
  end

  def self.number_from_element(element)
    raise NotImplementedError
  end
end
