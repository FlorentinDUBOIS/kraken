// ----------------------------------------------------------------------------
// filemanger's controller navigation
filemanager.controller( 'filemanager.navigation', ['$scope', '$login', '$sidenav',  '$window', '$mdSidenav', function( $scope, $login, $sidenav, $window, $mdSidenav ) {
    $scope.menu    = [];
    $scope.signets = [];

    // ----------------------------------------------------------------------------
    // open sidenav
    $scope.openSidenav = function() {
        $mdSidenav( 'left' ).toggle();
    };

    // ----------------------------------------------------------------------------
    // exit
    $scope.exit = function() {
        $login.logout( function( error, data ) {
            if( !error && data.success ) {
                $window.location.assign( data.redirect );
            }
        });
    };

    // ----------------------------------------------------------------------------
    // get user menu
    $sidenav.getUserMenu( function( error, data ) {
        if( !error ) {
            $scope.menu = data;
        }
    });

    // ----------------------------------------------------------------------------
    // get use signet
    $sidenav.getUserSignet( function( error, data ) {
        if( !error ) {
            $scope.signets = data;
        }
    });
}]);