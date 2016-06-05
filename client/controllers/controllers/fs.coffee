# -----------------------------------------------------------------------------
# fs controller
kraken.controller 'kraken.fs', ['$routeParams', ( $routeParams ) ->
    if $routeParams.path?
        path = $routeParams.path
    else
        path = '/'

    return
]