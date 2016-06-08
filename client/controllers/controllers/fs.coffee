kraken.controller 'kraken.fs', ['$scope', '$routeParams', '$fileSystem', '$bookmarks', '$logger', '$translate', '$mdDialog', ( $scope, $routeParams, $fileSystem, $bookmarks, $logger, $translate, $mdDialog ) ->
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
    # remove file
    $scope.removeFile = ( filename ) ->
        $fileSystem.removeFile $scope.realpath( "#{ $scope.path }/#{ filename }" ), ( error, data ) ->
            unless error?
                if data.removed is true
                    $translate( 'fs.removeFile' ).then ( trad ) ->
                        $logger.info trad
                        $scope.open $scope.path

    # -----------------------------------------------------------------------------
    # remove file
    $scope.removeFolder = ( filename ) ->
        $fileSystem.removeFolder $scope.realpath( "#{ $scope.path }/#{ filename }" ), ( error, data ) ->
            unless error?
                if data.removed is true
                    $translate( 'fs.removeFolder' ).then ( trad ) ->
                        $logger.info trad
                        $scope.open $scope.path

    # -----------------------------------------------------------------------------
    # rename file or folder
    $scope.rename = ( filename, $event ) ->
        $translate( 'fs.rename.title' ).then ( title ) ->
            $translate( 'fs.rename.text' ).then ( text ) ->
                $translate( 'fs.rename.ok' ).then ( ok ) ->
                    $translate( 'fs.rename.cancel' ).then ( cancel ) ->
                        $translate( 'fs.rename.placeholder' ).then ( placeholder ) ->
                            prompt = $mdDialog.prompt()
                                .title title
                                .textContent text
                                .ariaLabel placeholder
                                .placeholder placeholder
                                .targetEvent $event
                                .ok ok
                                .cancel cancel

                            $mdDialog.show( prompt ).then ( path ) ->
                                $fileSystem.rename $scope.realpath( "#{ $scope.path }/#{ filename }" ), $scope.realpath( "#{ $scope.path }/#{ path }" ), ( error, data ) ->
                                    unless error?
                                        if data.renamed is true
                                            $translate( 'fs.rename.success' ).then ( success ) ->
                                                $logger.info success
                                                $scope.open $scope.path
                            , ->

    # -----------------------------------------------------------------------------
    # init
    $scope.open $scope.path

    return
]