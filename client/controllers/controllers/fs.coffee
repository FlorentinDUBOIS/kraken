kraken.controller 'kraken.fs', ['$scope', '$routeParams', '$fileSystem', ( $scope, $routeParams, $fileSystem ) ->
    # -----------------------------------------------------------------------------
    # get path
    $scope.path = if $routeParams.path? then $routeParams.path else '/'

    # -----------------------------------------------------------------------------
    # open folder
    $scope.open = ( path ) ->
        $fileSystem.get path, ( error, data ) ->
            unless error?
                $scope.files   = data.files
                $scope.folders = data.folders

    # -----------------------------------------------------------------------------
    # init
    $scope.open $scope.path

    return
]