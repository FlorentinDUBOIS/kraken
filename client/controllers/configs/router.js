// ----------------------------------------------------------------------------
// configs routes
filemanager.config(['$routeProvider', function( $routeProvider ) {
    var routes = [
        { path: '/fs', controller: 'fs', templateUrl: 'views/fs.jade' }
    ];

    for( var i in routes ) {
        $routeProvider.when( routes[i].path, {
            controller: routes[i].controller,
            templateUrl: routes[i].templateUrl
        });
    }

    $routeProvider.otherwise( '/fs' );
}]);