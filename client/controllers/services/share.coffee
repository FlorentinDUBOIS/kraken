# -----------------------------------------------------------------------------
# share service
kraken.service '$share', ['$request', '$window', ( $request, $window ) ->
    @getAll = ( callback ) ->
        $request.get '/share', callback

    @get = ( _id, callback ) ->
        $request.get "/share/#{ _id }", callback

    @create = ( path, password, callback ) ->
        $request.post '/share',
            path: path
            password: password
        , callback

    @remove = ( _id, callback ) ->
        $request.delete "/share/#{ _id }", callback

    @link = ( _id ) ->
        "#{ $window.location.origin }/mount/share/#{ _id }"

    return
]