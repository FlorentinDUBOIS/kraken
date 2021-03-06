# -----------------------------------------------------------------------------
# kraken audio service
kraken.service '$audio', ['$window', '$mdBottomSheet', '$fs', '$logger', ( $window, $mdBottomSheet, $fs, $logger ) ->
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
        unless audio.loop
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
        # -----------------------------------------------------------------------------
        # open the bottom sheet
        $mdBottomSheet.show
            parent: angular.element $window.document.querySelector 'body'
            clickOutsideToClose: false
            disableBackdrop: true
            disableParentScroll: false
            escapeToClose: false
            templateUrl: 'views/audio.jade'
            controller: ['$scope', '$mdBottomSheet', '$interval', ( $scope, $mdBottomSheet, $interval ) =>
                # -----------------------------------------------------------------------------
                # init
                $scope.playing = true

                # -----------------------------------------------------------------------------
                # event binding
                audio.addEventListener 'loadstart', ->
                    $scope.endTime  = audio.duration
                    $scope.duration = audio.currentTime

                audio.addEventListener 'loadedmetadata', ->
                    $scope.endTime  = audio.seekable.end( 0 )

                audio.addEventListener 'canplay', ->
                    $scope.queueIndex = queueIndex
                    $scope.queue      = queue

                # -----------------------------------------------------------------------------
                # functions

                # -----------------------------------------------------------------------------
                # next
                $scope.next = =>
                    @next()

                    $scope.queueIndex = queueIndex
                    $scope.queue      = queue

                # -----------------------------------------------------------------------------
                # previous
                $scope.previous = =>
                    @previous()

                    $scope.queueIndex = queueIndex
                    $scope.queue      = queue

                # -----------------------------------------------------------------------------
                # play
                $scope.play = ->
                    audio.play()

                    $scope.playing = true

                # -----------------------------------------------------------------------------
                # pause
                $scope.pause = ->
                    audio.pause()

                    $scope.playing = false

                # -----------------------------------------------------------------------------
                # mute
                $scope.mute = ->
                    audio.volume = $scope.volume = 0

                # -----------------------------------------------------------------------------
                # loop controller
                $scope.loop = false
                $scope.setLoop = ( value ) ->
                    audio.loop = $scope.loop = value

                # -----------------------------------------------------------------------------
                # stop
                $scope.stop = ->
                    $mdBottomSheet.hide()
                    $window.document.querySelector( '.md-bottom-right, .md-bottom-left' ).classList.remove( 'md-over' )

                    audio.pause()

                    open              = false
                    $scope.playing    = false
                    $scope.queue      = queue      = []
                    $scope.queueIndex = queueIndex = 0

                # -----------------------------------------------------------------------------
                # change volume
                $scope.volume       = audio.volume * 100
                $scope.changeVolume = ->
                    audio.volume    = $scope.volume / 100

                # -----------------------------------------------------------------------------
                # change duration
                $scope.duration       = audio.currentTime
                $scope.changeDuration = ->
                    audio.currentTime = $scope.duration if audio.currentTime?

                # -----------------------------------------------------------------------------
                # check every seconds
                $interval ->
                    $scope.duration = audio.currentTime if audio.currentTime?
                , 1000

                return
            ]

    # -----------------------------------------------------------------------------
    # play a song
    @play = ( path, name ) =>
        $window.document.querySelector( '.md-bottom-right, .md-bottom-left' ).classList.add( 'md-over' )

        if not open
            @open( path, name )

            open = true

        $logger.info name

        audio.src = $fs.realpath "mount/#{ path }/#{ name }"
        audio.load()

    # -----------------------------------------------------------------------------
    # play queue
    @playQueue = =>
        if queue.length
            @play queue[0].path, queue[0].name

    # -----------------------------------------------------------------------------
    # previous
    @previous = =>
        unless queueIndex-1 < 0
            song = queue[queueIndex--]

            @play song.path, song.name

    # -----------------------------------------------------------------------------
    # next
    @next = =>
        unless queueIndex+1 >= queue.length
            song = queue[queueIndex++]

            @play song.path, song.name

    # -----------------------------------------------------------------------------
    # queue a song
    @queue = ( path, name ) ->
        queue.push
            path:   path
            name:   name

    return
]
