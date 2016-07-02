# -----------------------------------------------------------------------------
# create kraken fs controller
kraken.controller 'kraken.fs', ['$scope', '$fs', '$translate', '$logger', '$mdDialog', '$routeParams', '$signets', '$compress', '$mdSidenav', '$window', '$audio', '$video', '$image', ( $scope, $fs, $translate, $logger, $mdDialog, $routeParams, $signets, $compress, $mdSidenav, $window, $audio, $video, $image ) ->
    # -----------------------------------------------------------------------------
    # init variables
    $scope.selecteds = []
    $scope.files     = []
    $scope.load      = true
    $scope.path      = '/'
    $scope.share     = {}

    # -----------------------------------------------------------------------------
    # realpath
    $scope.realpath = $fs.realpath

    # -----------------------------------------------------------------------------
    # list
    $scope.list = ( path ) ->
        $scope.load = true
        $scope.path = $fs.realpath path

        $fs.list path, ( error, files ) ->
            $scope.load  = false
            $scope.files = files unless error?

    # -----------------------------------------------------------------------------
    # open
    $scope.open = ( name ) ->
        $scope.list "#{ $scope.path }/#{ name }"

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

                            $mdDialog.show( prompt ).then ( rename ) ->
                                $scope.load = true

                                $fs.rename "#{ $scope.path }/#{ name }", "#{ $scope.path }/#{ rename }", ( error, data ) ->
                                    unless error?
                                        if data.renamed is true
                                            $translate( 'fs.renameDialog.success' ).then ( trad ) ->
                                                $scope.list $scope.path
                                                $logger.info trad
                                    else
                                        $scope.list $scope.path
                            , ->

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
    # list from signet
    $scope.listFromSignet = ( _id ) ->
        $scope.load = true

        $signets.getOne _id, ( error, data ) ->
            $scope.list data.path

    # -----------------------------------------------------------------------------
    # compress
    $scope.compress = ( name ) ->
        $compress.zip "#{ $scope.path }/#{ name }", ( error, data ) ->
            unless error?
                if data.compressed is true
                    $translate( 'fs.compress.success' ).then ( trad ) ->
                        $logger.info trad
                        $scope.list $scope.path

    # -----------------------------------------------------------------------------
    # uncompress
    $scope.uncompress = ( name ) ->
        $compress.unzip "#{ $scope.path }/#{ name }", ( error, data ) ->
            unless error?
                if data.uncompressed is true
                    $translate( 'fs.uncompress.success' ).then ( trad ) ->
                        $logger.info trad
                        $scope.list $scope.path

    # -----------------------------------------------------------------------------
    # bookmark
    $scope.bookmark = ( name ) ->
        $signets.create "#{ $scope.path }/#{ name }", ( error, data ) ->
            unless error
                if data.created is true
                    $translate( 'fs.bookmark.success' ).then ( trad ) ->
                        $logger.info trad

    # -----------------------------------------------------------------------------
    # is archive
    $scope.isArchive = ( name ) ->
        /\.zip$/gi.test name

    # -----------------------------------------------------------------------------
    # is audio playable
    $scope.isAudioPlayable = ( name ) ->
        $audio.isPlayable $fs.realpath "#{ $scope.path }/#{ name }"

    # -----------------------------------------------------------------------------
    # playable
    $scope.isPlayable = ( name ) ->
        $audio.isPlayable( $fs.realpath "#{ $scope.path }/#{ name }" ) or $video.isPlayable( $fs.realpath "#{ $scope.path }/#{ name }" )

    # -----------------------------------------------------------------------------
    # play
    $scope.play = ( name ) ->
        if $audio.isPlayable $fs.realpath "#{ $scope.path }/#{ name }"
            $audio.play $scope.path, name
        else if $video.isPlayable $fs.realpath "#{ $scope.path }/#{ name }"
            $video.play $scope.path, name

    # -----------------------------------------------------------------------------
    # queue
    $scope.queue = ( name ) ->
        $audio.queue $scope.path, name

        $translate( 'fs.toolbar.playlist.success' ).then ( trad ) ->
            $logger.info trad

    # -----------------------------------------------------------------------------
    # queue selecteds
    $scope.queueSelecteds = ->
        for file in $scope.selecteds
            if $audio.isPlayable file.name
                $audio.queue $scope.path, file.name

        $translate( 'fs.toolbar.playlist.success' ).then ( trad ) ->
            $logger.info trad

    # -----------------------------------------------------------------------------
    # play songs in queue
    $scope.playQueue = ->
        $audio.playQueue()

    # -----------------------------------------------------------------------------
    # is viewable
    $scope.isViewable = ( name ) ->
        $image.isViewable name

    # -----------------------------------------------------------------------------
    $scope.view = ( name ) ->
        $image.view $scope.path, name

    # -----------------------------------------------------------------------------
    # init
    if $routeParams.signet?
        $scope.listFromSignet $routeParams.signet
    else
        $scope.list $scope.path

    return
]
