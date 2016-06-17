# -----------------------------------------------------------------------------
# compress services
kraken.service '$compress', ['$request', '$fs', ( $request, $fs ) ->
    @zip = ( name, callback ) ->
        $request.post $fs.realpath( "/compress/#{ name }" ), {}, callback

    @unzip = ( name, callback ) ->
        $request.delete $fs.realpath( "/compress/#{ name }" ), callback

    return
]