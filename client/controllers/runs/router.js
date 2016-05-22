// ----------------------------------------------------------------------------
// handle route change
filemanager.run(['$rootScope', '$http', '$location', '$translate', '$mdToast', function( $rootScope, $http, $location, $translate, $mdToast ) {
    var paths = [
        '/manage-account'
    ];

    $rootScope.$on( '$routeChangeStart', function( $event, $next, $current ) {
        if( paths.indexOf( $location.path()) == -1 ) {
            return next();
        }

        $http.get( 'user' ).then( function( res ) {
            if( !res.data.administrator ) {
                $translate( 'request.authorized' ).then( function( trad ) {
                    $mdToast.showSimple( trad );
                    $location.path( '/fs' );
                });
            }
        }, function( res ) {
            if( res.status == 403 ) {
                return $translate( 'request.authorized' ).then( function( trad ) {
                    $mdToast.showSimple( trad );
                });
            }

            $translate( 'request.failure' ).then( function( trad ) {
                $mdToast.showSimple( trad );
            });
        });
    });
}]);