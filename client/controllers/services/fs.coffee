# -----------------------------------------------------------------------------
# fs service
kraken.service '$fs', ['$request', ( $request ) ->
    @slach = ( path ) ->
        while true
            if /\/\//gi.test path
                path = path.replace /\/\//gi, '/'
            else
                return path

    @list = ( path, callback ) =>
        $request.get @slach( "/fs/#{ path }" ), callback

    @remove = ( path, callback ) =>
        $request.delete @slach( "/fs/#{ path }" ), callback

    return
]