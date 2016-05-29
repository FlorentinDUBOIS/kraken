// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();
const path   = require( 'path' );
const async  = require( 'async' );
const fs     = require( 'fs' );
const fse    = require( 'server/models/fs-extra' );
const Logger = require( 'server/models/logger' );
const logger = new Logger( path.basename( __filename ));

// ----------------------------------------------------------------------------
// routes
router.route( '/fs/info/*' ).get(( req, res ) => {
    fs.readdir( fse.rewrite( req.params['0'] ), ( error, files ) => {
        if( error ) {
            logger.error( error.message );

            return res.status( 500 ).end();
        }

        for( let i in files ) {
            files[i] = fse.rewrite( path.join( req.params['0'], files[i] ));
        }

        async.map( files, fs.stat, function( error, stats ) {
            if( error ) {
                logger.err( error.message );

                return res.status( 500 ).end();
            }

            let data = {
                files: [],
                folders: []
            };

            for( let i in files ) {
                let to = 'files';
                if( stats[i].isDirectory()) {
                    to = 'folders';
                }

                data[to].push({
                    name: path.basename( files[i] ),
                    size: stats[i].size,
                    path: req.params['0'],
                    right: fse.right( stats[i].mode ),
                    btime: stats[i].birthtime,
                    mtime: stats[i].mtime
                });
            }

            res.json( data );
        });
    });
});

// ----------------------------------------------------------------------------
// exports routes
module.exports = router;