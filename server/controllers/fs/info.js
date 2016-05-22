// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();
const path   = require( 'path' );
const fs     = require( 'fs' );
const Logger = require( '../../models/logger' );
const logger = new Logger( path.basename( __filename ));

// ----------------------------------------------------------------------------
// functions
function rewrite( file ) {
    return path.join( __dirname, '../../..', 'mount', file );
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
// routes
router.route( '/fs/info/*' ).get(( req, res ) => {
    fs.readdir( rewrite( req.params['0'] ), ( error, files ) => {
        if( error ) {
            logger.error( error.message );

            return res.status( 500 ).end();
        }

        let data = { files: [], folders: []};
        for( let file of files ) {
            let fpath = rewrite( path.join( req.params['0'], file ));
            let stats = fs.statSync( fpath );

            let to = 'files';
            if( stats.isDirectory()) {
                to = 'folders';
            }

            data[to].push({
                name: file,
                size: stats.size,
                path: req.params['0'],
                right: right( stats.mode ),
                btime: stats.birthtime,
                mtime: stats.mtime
            });
        }

        res.json( data );
    });
});

// ----------------------------------------------------------------------------
// exports routes
module.exports = router;