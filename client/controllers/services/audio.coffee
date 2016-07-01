# -----------------------------------------------------------------------------
# kraken audio service
kraken.service '$audio', ['$window', '$mdBottomSheet', '$fs', ( $window, $mdBottomSheet, $fs ) ->
    # -----------------------------------------------------------------------------
    # extensions allowed
    extensions = [
        'mp3'
        'wav'
    ]

    # -----------------------------------------------------------------------------
    # variables
    queue      = []
    queueIndex = 0
    audio      = $window.document.createElement 'audio'
    open       = false

    # -----------------------------------------------------------------------------
    # event binding
    audio.addEventListener 'canplay', ->
        audio.play()

    audio.addEventListener 'ended', =>
        if queueIndex+1 < queue.length
            @next()

    # -----------------------------------------------------------------------------
    # is playable
    @isPlayable = ( name ) ->
        for extension in extensions
            if ( new RegExp "(\.#{ extension })$" ).test name
                return true

        false

    # -----------------------------------------------------------------------------
    # open
    @open = ( path, name ) =>
        $mdBottomSheet.show
            parent: angular.element $window.document.querySelector 'body'
            clickOutsideToClose: false
            disableBackdrop: true
            disableParentScroll: false
            escapeToClose: false
            templateUrl: 'views/audio.jade'
            controller: ['$scope', '$mdBottomSheet', '$interval', ( $scope, $mdBottomSheet, $interval ) =>
                $scope.playing = true

                audio.addEventListener 'loadstart', ->
                    $scope.endTime  = audio.duration
                    $scope.duration = audio.currentTime

                audio.addEventListener 'loadedmetadata', ->
                    $scope.endTime  = audio.seekable.end( 0 )

                $scope.next     = @next
                $scope.previous = @previous
                $scope.play = ->
                    audio.play()

                    $scope.playing = true

                $scope.pause = ->
                    audio.pause()

                    $scope.playing = false

                $scope.stop = ->
                    $mdBottomSheet.hide()

                    audio.pause()

                    open           = false
                    queue          = []
                    queueIndex     = 0
                    $scope.playing = false

                $scope.volume       = audio.volume * 100
                $scope.changeVolume = ->
                    audio.volume    = $scope.volume / 100

                $scope.duration       = audio.currentTime
                $scope.changeDuration = ->
                    audio.currentTime = $scope.duration

                $interval ->
                    $scope.duration = audio.currentTime
                , 500

                return
            ]

    # -----------------------------------------------------------------------------
    # play a song
    @play = ( path, name ) =>
        if not open
            @open( path, name )

            open = true

        audio.src = $fs.realpath "mount/#{ path }/#{ name }"
        audio.load()

    # -----------------------------------------------------------------------------
    # previous
    @previous = =>
        song = queue[queueIndex--]

        @play song.path, song.name

    # -----------------------------------------------------------------------------
    # next
    @next = =>
        song = queue[queueIndex++]

        @play song.path, song.name

    # -----------------------------------------------------------------------------
    # queue a song
    @queue = ( path, name, $event ) ->
        queue.push
            path:   path
            name:   name
            $event: $event

    return
]
