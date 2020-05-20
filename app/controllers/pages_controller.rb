class PagesController < ApplicationController
  def index
    @pages = Page.all
    @cloths = Cloth.all
    @users = User.all
    gon.cloths_text = @cloths.select(:text)
    gon.cloths_image = @cloths.select(:cloth)
    gon.all_variables
  end
  
  def new
    @pages = Page.new
    @pages = Cloth.new
  end
  
end
