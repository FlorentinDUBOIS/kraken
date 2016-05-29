// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();
const path   = require( 'path' );
const Signet = require( 'server/models/db' ).models.Signet;
const Logger = require( 'server/models/logger' );
const logger = new Logger( path.basename( __filename ));

// ----------------------------------------------------------------------------
// routes
router.route( '/sidenav/signet' ).get(( req, res ) => {
    Signet.find({ user: req.session.user._id }, ( error, signets ) => {
       if( error ) {
           logger.error( error.message );

           return res.status( 500 ).end();
       }

       res.json( signets );
    });
});

// ----------------------------------------------------------------------------
// exports routes
module.exports = router;