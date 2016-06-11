# -----------------------------------------------------------------------------
# create kraken fs controller
kraken.controller 'kraken.fs', ['$scope', ( $scope ) ->
    # -----------------------------------------------------------------------------
    # init variables
    $scope.selecteds = []
    $scope.folders   = []
    $scope.files     = []
]