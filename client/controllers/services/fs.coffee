# -----------------------------------------------------------------------------
# fs service
kraken.service '$fs', ['$request', ( $request ) ->
    @slach = ( path ) ->
        while true
            if /\/\//gi.test path
                path = path.replace /\/\//gi, '/'
            else
                return path

    @realpath = ( path ) =>
        path     = @slach path
        dirnames = path.split '/'
        fpath    = []

        for i, dirname of dirnames
            continue if parseInt( i )+1 < dirnames.length && dirnames[parseInt( i )+1] is '..'
            continue if dirname is '..'

            fpath.push dirname

        return '/' if fpath.length is 0
        return fpath.join( '/' ).substring 1 if fpath.length is 1

        fpath.join '/'

    @list = ( path, callback ) =>
        $request.get @slach( "/fs/#{ @realpath path }" ), callback

    @remove = ( path, callback ) =>
        $request.delete @slach( "/fs/#{ @realpath path }" ), callback

    @rename = ( oldpath, newpath, callback ) =>
        $request.patch @slach( "/fs/#{ @realpath oldpath }" ), path: @slach( @realpath newpath ), callback

    return
]