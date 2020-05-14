class Page < ApplicationRecord  
  has_many :cloths
  belongs_to :user
end
