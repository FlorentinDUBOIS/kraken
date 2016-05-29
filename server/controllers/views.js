// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();
const path   = require( 'path' );

// ----------------------------------------------------------------------------
// functions
function rewrite( file ) {
    return path.join( __dirname, '../..', 'client/views', file );
}

// ----------------------------------------------------------------------------
// routes
router.route( '/views/*' ).get(( req, res ) => {
    res.render( rewrite( req.params['0'] ));
});

// ----------------------------------------------------------------------------
// exports routes
module.exports = router;