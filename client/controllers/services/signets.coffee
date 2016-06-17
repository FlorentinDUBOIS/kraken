# -----------------------------------------------------------------------------
# signets services
kraken.service '$signets', ['$request', '$fs', ( $request, $fs ) ->
    @get = ( callback ) ->
        $request.get '/signets', callback

    @getOne = ( _id, callback ) ->
        $request.get "/signets/#{ _id }", callback

    @create = ( path, callback ) ->
        $request.post '/signets', path: $fs.realpath( path ), callback

    @update = ( _id, path, callback ) ->
        $request.put "/signets/#{ _id }", path: $fs.realpath( path ), callback

    @delete = ( _id, callback ) ->
        $request.delete "/signets/#{ _id }", callback

    return
]