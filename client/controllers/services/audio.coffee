# -----------------------------------------------------------------------------
# kraken audio service
kraken.service '$audio', ['$window', '$mdDialog', '$logger', '$translate', ( $window, $mdDialog, $logger, $translate ) ->
    playables = [
        { extension: 'mp3', mime: 'audio/mpeg' }
        { extension: 'wav', mime: 'audio/wav' }
        # { extension: 'ogg', mime: 'audio/ogg' }
    ]

    @isPlayable = ( name ) ->
        for playable in playables
            if ( new RegExp "(\.#{ playable.extension })$", 'i' ).test name
                return true

        false

    @mime = ( name ) ->
        for playable in playables
            if ( new RegExp "(\.#{ playable.extension })$", 'i' ).test name
                return playable.mime

        null

    @extension = ( name ) ->
        for playable in playables
            if ( new RegExp "(\.#{ playable.extension })$", 'i' ).test name
                return playable.extension

        null

    @play = ( path, name, $event ) =>
        if @isPlayable name
            $mdDialog.show
                parent: angular.element $window.document.querySelector 'body'
                targetEvent: $event
                clickOutsideToClose: true
                templateUrl: 'views/audio.jade'
                controller: ['$scope', '$mdDialog', '$fs', ( $scope, $mdDialog, $fs ) =>
                    $scope.name     = $fs.realpath "mount/#{ path }/#{ name }"
                    $scope.mime     = @mime name
                    $scope.basename = name

                    $scope.close = =>
                        $mdDialog.hide()

                    return
                ]

        else
            $translate( 'service.$audio.error' ).then ( trad ) ->
                $logger.error trad

    return
]
