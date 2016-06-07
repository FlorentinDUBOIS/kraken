# -----------------------------------------------------------------------------
# file system service
kraken.service '$fileSystem', ['$request', ( $request ) ->
    @get = ( path, callback ) ->
        $request.get "/file-system/info/#{ path }", callback

    return
]