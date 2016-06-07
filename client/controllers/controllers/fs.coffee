kraken.controller 'kraken.fs', ['$scope', '$routeParams', '$fileSystem', '$bookmarks', '$logger', ( $scope, $routeParams, $fileSystem, $bookmarks, $logger ) ->
    # -----------------------------------------------------------------------------
    # get path
    $scope.path     = if $routeParams.path? then $routeParams.path else '/'
    $scope.dirnames = $scope.path.split '/'

    # -----------------------------------------------------------------------------
    # remove useless element in dirnames
    $scope.removeUseless = ( dirnames ) ->
        dirnames.filter ( element ) ->
            element isnt ""

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

        if fpath.length is 0
            return '/'

        if fpath.length is 1
            return fpath.join( '/' ).substring 1

        fpath.join '/'

    # ----------------------------------------------------------------------------
    # level
    $scope.level = ( dirnames, level ) ->
        lpath    = []

        for i, dirname of dirnames
            console.log dirname

            # level+1 to /
            # level+1 to guard folder clicked
            if i < level+2
                lpath.push dirname
            else
                console.log if 0 is lpath.length then '/' else lpath.join '/'
                return if 0 is lpath.length then '/' else lpath.join '/'

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