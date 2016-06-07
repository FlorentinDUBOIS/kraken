# -----------------------------------------------------------------------------
# file system service
kraken.service '$fileSystem', ['$request', ( $request ) ->
    @get = ( path, callback ) ->
        $request.get "/file-system/root/#{ path }", callback

    return
]