// ----------------------------------------------------------------------------
// sidenav controller
filemanager.controller( 'filemanager.sidenav', ['$scope', '$http', '$translate', '$mdToast', function( $scope, $http, $translate, $mdToast ) {
    $scope.user    = [];
    $scope.signets = [];

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