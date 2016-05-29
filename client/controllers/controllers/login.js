// ----------------------------------------------------------------------------
// create login controller
filemanager.controller( 'filemanager.login', ['$scope', '$translate', '$logger', '$window', '$login', function( $scope, $translate, $logger, $window, $login ) {
    $scope.submit = function() {
        $login.signin( $scope.login.username, $scope.login.password, function( error, data ) {
           if( !error ) {
               if( !data.login ) {
                    return $translate( 'login.wrong' ).then( function( trad ) {
                        $logger.error( trad );
                    });
               }

               $window.location.assign( data.redirect );
           }
        });

        return false;
    };
}]);