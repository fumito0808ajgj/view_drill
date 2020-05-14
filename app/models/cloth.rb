class Cloth < ApplicationRecord
  belongs_to :page
  mount_uploader :cloth, ImageUploader
end
