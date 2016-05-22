// ----------------------------------------------------------------------------
// fs controller
filemanager.controller( 'filemanager.fs', ['$scope', '$http', '$translate', '$mdToast', function( $scope, $http, $translate, $mdToast ) {
    $scope.foldersSelected = [];
    $scope.filesSelected   = [];

    $scope.folders = [
        { name: 'Grimm', right: 'drwxr-xr-x' },
    ];

    $scope.files = [
        { name: 'README.md', size: '16Ko', right: '-rwxr-xr-x', mime: 'text/markdown' }
    ]
}]);