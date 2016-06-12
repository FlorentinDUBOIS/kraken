# -----------------------------------------------------------------------------
# menu service
kraken.service '$menu', ['$request', ( $request ) ->
    @getItems = ( callback ) ->
        $request.get 'menu', callback

    return
]