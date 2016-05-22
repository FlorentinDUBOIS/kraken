// ----------------------------------------------------------------------------
// create ucfirst filter
filemanager.filter( 'upper', [function() {
    return function( input ) {
        if( input ) {
            return input.toUpperCase();
        }

        return input;
    };
}]);