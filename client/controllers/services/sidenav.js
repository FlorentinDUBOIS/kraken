// ----------------------------------------------------------------------------
// sidenav service
filemanager.service( '$sidenav', ['$request', function( $request ) {
    this.getUserMenu = function( callback ) {
        $request.get( 'sidenav/user', callback );
    };

    this.getUserSignet = function( callback ) {
        $request.get( 'sidenav/signet', callback );
    };
}]);