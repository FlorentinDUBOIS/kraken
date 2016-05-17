// ----------------------------------------------------------------------------
// create ucfirst filter
filemanager.filter( 'ucfirst', [function() {
    return function( input ) {
        if( input ) {
            return input.charAt( 0 ).toUpperCase() + input.substring( 1 );
        }

        return input;
    };
}]);