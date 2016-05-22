// ----------------------------------------------------------------------------
// create ucfirst filter
filemanager.filter( 'lower', [function() {
    return function( input ) {
        if( input ) {
            return input.toLowerCase();
        }

        return input;
    };
}]);