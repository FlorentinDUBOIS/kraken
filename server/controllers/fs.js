// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();
const path   = require( 'path' );
const fs     = require( 'fs' );
const multer = require( 'multer' );
const upload = multer({
    dest: path.join( __dirname, '../..', 'uploads' )
});

// ----------------------------------------------------------------------------
// functions
function rewrite( file ) {
    return path.join( __dirname, '../..', 'mount', req.params['0'] );
}

// ----------------------------------------------------------------------------
// routes
router.route( '/fs/*' ).get(( req, res ) => {
    fs.readdir( path.dirname( rewrite( req.params['0'] )), ( error, files ) => {
        if( error ) {
            logger.error( error.message );

            return res.status( 500 ).end();
        }

        if( files.indexOf( path.basename( req.params['0'] )) == -1 ) {
            return res.status( 404 ).end();
        }

        res.sendFile( rewrite( req.params['0'] ));
    });
}).post( upload.array( 'files' ), ( req, res ) => {

}).put( upload.single( 'file' ), ( req, res ) => {

}).delete(( req, res ) => {
    fs.readdir( path.dirname( rewrite( req.params['0'] )), ( error, files ) => {
        if( error ) {
            logger.error( error.message );

            return res.status( 500 ).end();
        }

        if( files.indexOf( path.basename( req.params['0'] )) == -1 ) {
            return res.status( 404 ).end();
        }

        fs.unlink( rewrite( req.params['0'] ), ( error ) => {
            if( error ) {
                logger.error( error.message );

                return res.status( 500 ).end();
            }

            res.status( 200 ).end();
        });
    });
});

// ----------------------------------------------------------------------------
// exports routes
module.exports = router;