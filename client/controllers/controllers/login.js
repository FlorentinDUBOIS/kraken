// ----------------------------------------------------------------------------
// create login controller
filemanager.controller( 'login', ['$scope', '$http', '$mdToast', '$window', function( $scope, $http, $mdToast, $window ) {
    $scope.submit = function() {
        $http.post( '/log', $scope.login ).then( function() {

        }, function() {

        });

        return false;
    };
}]);