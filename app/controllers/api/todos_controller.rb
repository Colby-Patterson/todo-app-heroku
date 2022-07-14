class Api::TodosController < ApplicationController
  def index
    render json: Todo.all
  end

  def create
    todo = Todo.create(name: params[:name], complete: false)
    render json: todo
  end

  def update
    todo = Todo.find(params[:id])
    todo.update(complete: !todo.complete)
    render json: todo
  end
end
