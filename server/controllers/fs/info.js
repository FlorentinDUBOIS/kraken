// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();
const path   = require( 'path' );
const fs     = require( 'fs' );
const fse    = require( '../../models/fs-extra' );
const Logger = require( '../../models/logger' );
const logger = new Logger( path.basename( __filename ));

// ----------------------------------------------------------------------------
// routes
router.route( '/fs/info/*' ).get(( req, res ) => {
    fs.readdir( fse.rewrite( req.params['0'] ), ( error, files ) => {
        if( error ) {
            logger.error( error.message );

            return res.status( 500 ).end();
        }

        let data = { files: [], folders: []};
        for( let file of files ) {
            let stats = fs.statSync( fse.rewrite( path.join( req.params['0'], file )));

            let to = 'files';
            if( stats.isDirectory()) {
                to = 'folders';
            }

            data[to].push({
                name: file,
                size: stats.size,
                path: req.params['0'],
                right: fse.right( stats.mode ),
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