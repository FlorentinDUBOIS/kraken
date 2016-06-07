# -----------------------------------------------------------------------------
# file system service
kraken.service '$fileSystem', ['$request', '$window', '$timeout', ( $request, $window, $timeout ) ->
    @get = ( path, callback ) ->
        $request.get "/file-system/root/#{ path }", callback

    @removeFile = ( path, callback ) ->
        $request.delete "/file-system/file-menu/#{ path }", callback

    @removeFolder = ( path, callback ) ->
        $request.delete "/file-system/folder-menu/#{ path }", callback

    return
]