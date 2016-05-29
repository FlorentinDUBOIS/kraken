// ----------------------------------------------------------------------------
// fs controller
filemanager.controller( 'filemanager.fs', ['$scope', '$http', '$translate', '$mdToast', function( $scope, $http, $translate, $mdToast ) {
    $scope.foldersSelected = [];
    $scope.filesSelected   = [];
    $scope.path            = '/';

    $scope.formatPath = function( path ) {
        path = path.replace( /\/\//gi, '/' );

        var dirs = path.split( '/' );
        var data = [];
        for( var i = 0; i < dirs.length; ++i ) {
            if( i +1 < dirs.length ) {
                if( dirs[i+1] === '..' ) {
                    continue;
                }
            }

            if( dirs[i] === '..' ) {
                continue;
            }

            data.push( dirs[i] );
        }

        path = data.join( '/' );
        if( path === '' ) {
            path = '/';
        }

        return path;
    };

    $scope.location = function( path ) {
        path = $scope.formatPath( path );

        $http.get( '/fs/info' + path ).then( function( res ) {
            $scope.folders         = res.data.folders;
            $scope.files           = res.data.files;
            $scope.foldersSelected = [];
            $scope.filesSelected   = [];
            $scope.path            = path;
        }, function() {
            $translate( 'request.failure' ).then( function( trad ) {
                $mdToast.showSimple( trad );
            });
        });
    };

    $scope.location( '/' );
}]);