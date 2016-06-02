# -----------------------------------------------------------------------------
# navigation controller
kraken.controller 'kraken.navigation', ['$scope', '$user', '$window', '$sidenav', '$mdSidenav', ( $scope, $user, $window, $sidenav, $mdSidenav ) ->
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

    return
]