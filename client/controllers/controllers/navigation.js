// ----------------------------------------------------------------------------
// filemanger's controller navigation
filemanager.controller( 'filemanager.navigation', ['$scope', '$http', '$window', '$translate', '$mdToast', '$mdSidenav', function( $scope, $http, $window, $translate, $mdToast, $mdSidenav ) {
    $scope.user    = [];
    $scope.signets = [];

    $scope.openSidenav = function() {
        $mdSidenav( 'left' ).toggle();
    };

    $scope.exit = function() {
        $http.delete( 'log' ).then( function( res ) {
            if( !res.data.success ) {
                return $translate( 'request.failure' ).then( function( trad ) {
                    $mdToast.showSimple( trad );
                });
            }

            $window.location.assign( res.data.redirect );
        }, function() {
            $translate( 'request.failure' ).then( function( trad ) {
                $mdToast.showSimple( trad );
            });
        });
    }

    $http.get( 'sidenav/user' ).then( function( res ) {
        $scope.user = res.data;
    }, function() {
        $translate( 'request.failure' ).then( function( trad ) {
            $mdToast.showSimple( trad );
        });
    })

    $http.get( 'sidenav/signet' ).then( function( res ) {
        $scope.signets = res.data;
    }, function() {
        $translate( 'request.failure' ).then( function( trad ) {
            $mdToast.showSimple( trad );
        });
    });
}]);