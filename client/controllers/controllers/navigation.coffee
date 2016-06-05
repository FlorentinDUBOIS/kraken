# -----------------------------------------------------------------------------
# navigation controller
kraken.controller 'kraken.navigation', ['$scope', '$user', '$window', '$mdSidenav', '$menu', '$bookmarks', '$translate', '$logger', ( $scope, $user, $window, $mdSidenav, $menu, $bookmarks, $translate, $logger ) ->
    $scope.menu    = []
    $scope.bookmarks = []

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
    $scope.getBookmarks = ->
        $bookmarks.getAll ( error, bookmarks ) ->
            $scope.bookmarks = bookmarks unless error?

    # -----------------------------------------------------------------------------
    # init
    $scope.getBookmarks()
    $menu.getItems ( error, items ) ->
        $scope.menu = items unless error?

    return
]