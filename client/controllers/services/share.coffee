# -----------------------------------------------------------------------------
# share service
kraken.service '$share', ['$request', ( $request ) ->
    @getAll = ( callback ) ->
        $request.get '/share', callback

    @get = ( _id, callback ) ->
        $request.get "/share/#{ _id }", callback

    @create = ( data, callback ) ->
        $request.post '/share', data, callback

    @remove = ( _id, callback ) ->
        $request.delete "/share/#{ _id }", callback

    return
]