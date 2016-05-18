// ----------------------------------------------------------------------------
// create login controller
filemanager.controller( 'login', ['$scope', '$http', '$translate', '$mdToast', '$window', function( $scope, $http, $translate, $mdToast, $window ) {
    $scope.submit = function() {
        $http.post( '/log', $scope.login ).then( function( res ) {
            if( !res.data.login ) {
                return $translate( 'login.wrong' ).then( function( trad ) {
                    $mdToast.showSimple( trad );
                });
            }

            $window.location.assign( 'home' );
        }, function( res ) {
            if( res.status == 403 || !res.data.login ) {
                return $translate( 'login.wrong' ).then( function( trad ) {
                    $mdToast.showSimple( trad );
                });
            }

            $translate( 'request.failure' ).then( function( trad ) {
                $mdToast.showSimple( trad );
            });
        });

        return false;
    };
}]);