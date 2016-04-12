// -----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();
const fs     = require( 'fs' );
const logger = require( '../libs/logger' );

// -----------------------------------------------------------------------------
// router
router.get( '/fs/:path', ( req, res ) => {
    logger.info( `Read directory ${ req.params.path }` );

    fs.readdir( req.params.path, ( error, files ) => {
        if( error !== null && error !== undefined ) {
            logger.error( `Cannot read directory : ${ req.params.path }; ${ error.message }` );

            return;
        }

        res.json({
            files: [],
            folders: []
        });
    });
});

// -----------------------------------------------------------------------------
// exports
module.exports = router;
