# -----------------------------------------------------------------------------
# create kraken fs controller
kraken.controller 'kraken.fs', ['$scope', '$fs', '$translate', '$logger', ( $scope, $fs, $translate, $logger ) ->
    # -----------------------------------------------------------------------------
    # init variables
    $scope.selecteds = []
    $scope.files     = []
    $scope.path      = '/'


    # -----------------------------------------------------------------------------
    # remove file
    $scope.remove = ( name ) ->
        $fs.remove "#{ $scope.path }/#{ name }", ( error, data ) ->
            unless error?
                $translate( 'fs.remove' ).then ( trad ) ->
                    $logger.info trad

    # -----------------------------------------------------------------------------
    # init

    # -----------------------------------------------------------------------------
    # get list
    $fs.list $scope.path, ( error, files ) ->
        $scope.files = files unless error?

    return
]