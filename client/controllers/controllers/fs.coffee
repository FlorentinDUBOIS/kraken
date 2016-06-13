# -----------------------------------------------------------------------------
# create kraken fs controller
kraken.controller 'kraken.fs', ['$scope', '$fs', '$translate', '$logger', ( $scope, $fs, $translate, $logger ) ->
    # -----------------------------------------------------------------------------
    # init variables
    $scope.selecteds = []
    $scope.files     = []
    $scope.path      = '/'

    # -----------------------------------------------------------------------------
    # list
    $scope.list = ( path ) ->
        $scope.path = path

        $fs.list path, ( error, files ) ->
            $scope.files = files unless error?

    # -----------------------------------------------------------------------------
    # remove file
    $scope.remove = ( name ) ->
        $fs.remove "#{ $scope.path }/#{ name }", ( error, data ) ->
            unless error?
                $translate( 'fs.remove' ).then ( trad ) ->
                    $scope.list $scope.path
                    $logger.info "#{ trad } : #{ name }"

    # -----------------------------------------------------------------------------
    # remove selecteds files
    $scope.removeSelecteds = ->
        for file in $scope.selecteds
            $scope.remove file.name

    # -----------------------------------------------------------------------------
    # init
    $scope.list $scope.path

    return
]