# -----------------------------------------------------------------------------
# create kraken fs controller
kraken.controller 'kraken.fs', ['$scope', '$fs', ( $scope, $fs ) ->
    # -----------------------------------------------------------------------------
    # init variables
    $scope.selecteds = []
    $scope.files     = []
    $scope.path      = '/'
    $scope.order     = ( item ) ->


    # -----------------------------------------------------------------------------
    # get list
    $fs.list $scope.path, ( error, files ) ->
        $scope.files = files unless error?

    return
]