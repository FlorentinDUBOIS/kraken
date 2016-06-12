# -----------------------------------------------------------------------------
# fs service
kraken.service '$fs', ['$request', ( $request ) ->
    @list = ( path, callback ) ->
        path = path.substring 1 if '/' is path.charAt 0

        $request.get "/fs/#{ path }", callback

    return
]