module Service
  class Base
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

    def self.title_from_element(element)
      raise NotImplementedError
    end
  end
end
