// ----------------------------------------------------------------------------
// login service
filemanager.service( '$login', ['$request', function( $request ) {
    this.signin = function( username, password, callback ) {
        $request.post( '/log', { username: username, password: password }, callback );
    };

    this.logout = function( callback ) {
        $request.delete( '/log', callback );
    };
}]);