# -----------------------------------------------------------------------------
# file system service
kraken.service '$fileSystem', ['$request', ( $request ) ->
    @get = ( path, callback ) ->
        $request.get "/file-system/info/#{ path }", callback

    @rename = ( oldPath, newPath, callback ) ->
        $request.put "/file-system/info/#{ oldPath }", path: newPath, callback

    @file = ( filename ) ->
        "/file-system/root/#{ filename }"

    @removeFile = ( path, callback ) ->
        $request.delete "/file-system/file-menu/#{ path }", callback

    @removeFolder = ( path, callback ) ->
        $request.delete "/file-system/folder-menu/#{ path }", callback

    return
]