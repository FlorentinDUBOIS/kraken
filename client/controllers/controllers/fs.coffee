# -----------------------------------------------------------------------------
# fs controller
kraken.controller 'kraken.fs', ['$routeParams', '$fileSystem', ( $routeParams, $fileSystem ) ->
    # -----------------------------------------------------------------------------
    # init var
    $scope.files   = []
    $scope.folders = []

    # -----------------------------------------------------------------------------
    # get path
    if $routeParams.path?
        path = $routeParams.path
    else
        path = '/'

    # -----------------------------------------------------------------------------
    # open
    $scope.open = ( path ) ->
        $fileSystem.get path, ( error, data ) ->
            unless error?
                $scope.files   = data.files
                $scope.folders = data.folders

    # -----------------------------------------------------------------------------
    # init
    $scope.open path

    return
]