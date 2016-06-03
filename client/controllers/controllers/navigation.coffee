# -----------------------------------------------------------------------------
# navigation controller
kraken.controller 'kraken.navigation', ['$scope', '$user', '$window', '$mdSidenav', '$menu', ( $scope, $user, $window, $mdSidenav, $menu ) ->
    $scope.menu    = []
    $scope.signets = []

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
    # init
    $menu.getItems ( error, items ) ->
        $scope.menu = items unless error?

    return
]