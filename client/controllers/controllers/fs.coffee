kraken.controller 'kraken.fs', ['$scope', '$routeParams', '$fileSystem', '$bookmarks', '$logger', ( $scope, $routeParams, $fileSystem, $bookmarks, $logger ) ->
    # -----------------------------------------------------------------------------
    # get path
    $scope.path     = if $routeParams.path? then $routeParams.path else '/'
    $scope.dirnames = $scope.path.split '/'

    # -----------------------------------------------------------------------------
    # remove ..
    $scope.realpath = ( path ) ->
        path     = path.replace /\/\//gi, '/'
        dirnames = path.split '/'
        fpath    = []

        for i, dirname of dirnames
            continue if i+1 < dirnames.length && dirnames[i+1] is '..'
            continue if dirname is '..'

            fpath.push dirname

        if fpath.length is 0 then '/' else fpath.join '/'

    # ----------------------------------------------------------------------------
    # level
    $scope.level = ( path, level ) ->
        dirnames = path.split '/'
        lpath    = []

        for i, dirname of dirnames
            if i < level
                lpath.push dirname
            else
                return if 0 is lpath.length then '/' else lfpath.join '/'

    # -----------------------------------------------------------------------------
    # open folder
    $scope.open = ( path ) ->
        $scope.path     = path
        $scope.dirnames = path.split '/'

        $fileSystem.get path, ( error, data ) ->
            unless error?
                $scope.files   = data.files
                $scope.folders = data.folders

    # -----------------------------------------------------------------------------
    # change location
    $scope.location = ( filename ) ->
        $scope.open $scope.realpath "#{ $scope.path }/#{ filename }"

    # -----------------------------------------------------------------------------
    # bookmark
    $scope.bookmark = ( filename ) ->
        $bookmarks.create $scope.realpath( "#{ $scope.path }/#{ filename }" ), ( error, data ) ->
            unless error?
                if data.created
                    $translate( 'fs.bookmarkCreated' ).then ( trad ) ->
                        $logger.info trad

    # -----------------------------------------------------------------------------
    # init
    $scope.open $scope.path

    return
]