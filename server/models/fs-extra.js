// ----------------------------------------------------------------------------
// requirements
const path = require( 'path' );

// ----------------------------------------------------------------------------
// functions
function rewrite( file ) {
    return path.join( __dirname, '../..', 'mount', file );
}

function formatRight( nombre ) {
    switch( nombre ) {
        case 7: {
            return 'rwx';
        }

        case 6: {
            return 'rw-';
        }

        case 5: {
            return 'r-x';
        }

        case 4: {
            return 'r--';
        }

        case 3: {
            return '-wx';
        }

        case 2: {
            return '-w-';
        }

        case 1: {
            return '--x';
        }

        case 0: {
            return '---';
        }
    }
}

function right( mode ) {
    let right = (mode & parseInt( '777', 8 )).toString( 8 );

    let u = formatRight( parseInt( right.charAt( 0 )));
    let g = formatRight( parseInt( right.charAt( 1 )));
    let o = formatRight( parseInt( right.charAt( 2 )));

    return `${ u }${ g }${ o }`;
}

// ----------------------------------------------------------------------------
// module.exports
module.exports = {
    rewrite: rewrite,
    right: right,
    formatRight: formatRight
};