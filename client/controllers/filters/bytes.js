// ----------------------------------------------------------------------------
// create ucfirst filter
filemanager.filter( 'bytes', [function() {
    return function( input ) {
        if( input ) {
		    var precision = 1;
		    var units     = ['o', 'Ko', 'Mo', 'Go', 'To', 'Po'];
            var number    = Math.floor( Math.log( input ) / Math.log( 1024 ));

            return (input / Math.pow( 1024, Math.floor( number ))).toFixed( precision ) +  ' ' + units[number];
        }

        return input;
    };
}]);