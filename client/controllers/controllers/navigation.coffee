# -----------------------------------------------------------------------------
# navigation controller
kraken.controller 'kraken.navigation', ['$scope', '$user', '$window', '$mdSidenav', '$menu', '$bookmarks', '$translate', '$logger', '$share', ( $scope, $user, $window, $mdSidenav, $menu, $bookmarks, $translate, $logger, $share ) ->
    $scope.menu      = []
    $scope.bookmarks = []
    $scope.shares    = []

    # -----------------------------------------------------------------------------
    # open sidenav
    $scope.openSidenav = ->
        $mdSidenav( 'left' ).toggle()

    # -----------------------------------------------------------------------------
    # exit
    $scope.exit = ->
        $user.logout ( error, data ) ->
            $window.location.assign data.redirect if data.redirect? unless error?

    # -----------------------------------------------------------------------------
    # removeBookmark
    $scope.removeBookmark = ( _id ) ->
        $bookmarks.remove _id, ( error, data ) ->
            unless error?
                if data.removed
                    $translate( 'navigation.removeBookmark' ).then ( trad ) ->
                        $logger.info trad
                        $scope.getBookmarks()

    # -----------------------------------------------------------------------------
    # remove share
    $scope.removeShare = ( _id ) ->
        $share.remove _id, ( error, data ) ->
            unless error?
                if data.removed
                    $translate( 'navigation.removeShare' ).then ( trad ) ->
                        $logger.info trad
                        $scope.getShares()


    # -----------------------------------------------------------------------------
    # get bookmark
    $scope.getBookmarks = ->
        $bookmarks.getAll ( error, bookmarks ) ->
            $scope.bookmarks = bookmarks unless error?

    # -----------------------------------------------------------------------------
    # get shares
    $scope.getShares = ->
        $share.getAll ( error, shares ) ->
            $scope.shares = shares unless error?

    # -----------------------------------------------------------------------------
    # init
    $scope.getShares()
    $scope.getBookmarks()
    $menu.getItems ( error, items ) ->
        $scope.menu = items unless error?

    return
]