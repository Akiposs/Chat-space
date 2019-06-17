class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @messages=@group.messages.where('id > ?', params[:id])
    respond_to do |format|
      format.json
    end
  end
end