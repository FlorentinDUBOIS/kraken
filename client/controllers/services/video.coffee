# -----------------------------------------------------------------------------
# kraken video service
kraken.service '$video', ['$window', '$mdDialog', '$logger', '$translate', ( $window, $mdDialog, $logger, $translate ) ->
    # -----------------------------------------------------------------------------
    # init variables
    playables = [
        { extension: 'mp4',  mime: 'video/mp4' }
        { extension: 'webm', mime: 'video/webm' }
        { extension: 'ogg',  mime: 'video/ogg' }
    ]

    # -----------------------------------------------------------------------------
    # is a playable video
    @isPlayable = ( name ) ->
        for playable in playables
            if ( new RegExp "(\.#{ playable.extension })$", 'i' ).test name
                return true

        false

    # -----------------------------------------------------------------------------
    # type mime of the file
    @mime = ( name ) ->
        for playable in playables
            if ( new RegExp "(\.#{ playable.extension })$", 'i' ).test name
                return playable.mime

        null

    # -----------------------------------------------------------------------------
    # extension of the file
    @extension = ( name ) ->
        for playable in playables
            if ( new RegExp "(\.#{ playable.extension })$", 'i' ).test name
                return playable.extension

        null

    # -----------------------------------------------------------------------------
    # play the video
    @play = ( path, name ) =>
        if @isPlayable name
            $mdDialog.show
                parent: angular.element $window.document.querySelector 'body'
                clickOutsideToClose: true
                escapeToClose: true
                templateUrl: 'views/video.jade'
                controller: ['$scope', '$mdDialog', '$fs', ( $scope, $mdDialog, $fs ) =>
                    $scope.name     = $fs.realpath "mount/#{ path }/#{ name }"
                    $scope.mime     = @mime name
                    $scope.basename = name

                    $scope.close = ->
                        $mdDialog.hide()

                    return
                ]

        else
            $translate( 'service.$video.error' ).then ( trad ) ->
                $logger.error trad

    return
]
