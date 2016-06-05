# -----------------------------------------------------------------------------
# signets service
kraken.service '$bookmarks', ['$request', ( $request ) ->
    @get = ( _id, callback ) ->
        $request.get "/bookmarks/#{ _id }", callback

    @getAll = ( callback ) ->
        $request.get '/bookmarks', callback

    @create = ( path, callback ) ->
        $request.post '/bookmarks', path: path, callback

    @update = ( _id, path, callback ) ->
        $request.put "/bookmarks/#{ _id }", path: path, callback

    @remove = ( _id, callback ) ->
        $request.delete "/bookmarks/#{ _id }", callback

    @removeAll = ( callback ) ->
        $request.delete '/bookmarks', callback

    return
]