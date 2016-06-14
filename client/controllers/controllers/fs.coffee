# -----------------------------------------------------------------------------
# create kraken fs controller
kraken.controller 'kraken.fs', ['$scope', '$fs', '$translate', '$logger', '$mdDialog', ( $scope, $fs, $translate, $logger, $mdDialog ) ->
    # -----------------------------------------------------------------------------
    # init variables
    $scope.selecteds = []
    $scope.files     = []
    $scope.load      = true
    $scope.path      = '/'

    # -----------------------------------------------------------------------------
    # list
    $scope.list = ( path ) ->
        $scope.load = true
        $scope.path = path

        $fs.list path, ( error, files ) ->
            $scope.load  = false
            $scope.files = files unless error?

    # -----------------------------------------------------------------------------
    # rename
    $scope.rename = ( name, $event ) ->
        $translate( 'fs.renameDialog.title' ).then ( title ) ->
            $translate( 'fs.renameDialog.text' ).then ( text ) ->
                $translate( 'fs.renameDialog.placeholder' ).then ( placeholder ) ->
                    $translate( 'fs.renameDialog.ok' ).then ( ok ) ->
                        $translate( 'fs.renameDialog.cancel' ).then ( cancel ) ->
                            prompt = $mdDialog.prompt()
                            prompt
                                .title title
                                .textContent text
                                .placeholder placeholder
                                .ariaLabel placeholder
                                .targetEvent $event
                                .ok ok
                                .cancel cancel

                            $mdDialog.show( prompt ).then(  )


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