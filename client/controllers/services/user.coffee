kraken.service '$user', ['$request', ( $request ) ->
    @get = ( _id, callback ) ->
        $request.get "/users/#{ _id }", callback

    @update = ( user, callback ) ->
        $request.put "/users/#{ user._id }", data,  callback

    @delete = ( _id, callback ) ->
        $request.delete "/users/#{ _id }", callback

    @getAll = ( callback ) ->
        $request.get '/users', callback

    @login = ( username, password, callback ) ->
        $request.post '/log',
            username: username
            password: password
        , callback

    @logout = ( callback ) ->
        $request.delete '/log', callback
]