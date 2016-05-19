// ----------------------------------------------------------------------------
// filemanger's controller toolbar
filemanager.controller( 'toolbar', ['$scope', '$http', '$window', '$translate', '$mdToast', function( $scope, $http, $window, $translate, $mdToast ) {
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
}]);