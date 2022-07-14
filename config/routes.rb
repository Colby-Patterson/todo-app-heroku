Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api do
    get '/todos', to: "todos#index"
    post '/todos', to: "todos#create"
    put '/todos/:id', to: "todos#update"
  end

  get '*other', to: 'static#index'
end
