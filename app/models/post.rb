class Post < ApplicationRecord
  validates :text, presence: true
  validates :image, presence: true
  mount_uploader :image, ImageUploader
  belongs_to :user
  has_many :comments
  def self.search(search)
    return Post.all unless search
    Post.where('text LIKE(?)', "%#{search}%")
  end
end
