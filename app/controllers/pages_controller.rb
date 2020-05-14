class PagesController < ApplicationController
  def index
    @pages = Page.all
    @cloths = Cloth.all
    @users = User.all
    respond_to do |format|
      format.html 
      format.json {
        render json: { cloths: @cloths, users: @users }
      }
    end
  end
  
  def new
    @pages = Page.new
    @pages = Cloth.new
  end
  
end
