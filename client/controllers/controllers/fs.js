// ----------------------------------------------------------------------------
// fs controller
filemanager.controller( 'filemanager.fs', ['$scope', '$http', '$translate', '$mdToast', function( $scope, $http, $translate, $mdToast ) {
    $scope.foldersSelected = [];
    $scope.filesSelected   = [];

    $scope.location = function( path ) {
        $http.get( '/fs/info' + path ).then( function( res ) {
            $scope.folders = res.data.folders;
            $scope.files   = res.data.files;
        }, function() {
            $translate( 'request.failure' ).then( function( trad ) {
                $mdToast.showSimple( trad );
            });
        });
    };

    $scope.location( '/' );
}]);