// ----------------------------------------------------------------------------
// create truncate filter
filemanager.filter( 'truncate', [function() {
    return function( input, size ) {
        if( input ) {
            if( !size ) {
                size = 40;
            }

            if( input.length > size ) {
                return input.substring( 0, size -3 ) + '...';
            }
        }

        return input;
    };
}]);