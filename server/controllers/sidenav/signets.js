// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();
const Signet = require( '../../models/db' ).models.Signet;
const path   = require( 'path' );
const Logger = require( '../../models/logger' );
const logger = new Logger( path.basename( __filename ));

// ----------------------------------------------------------------------------
// routes
router.route( '/sidenav/signet' ).get(( req, res ) => {
    Signet.find({ username: req.session.user.username }, ( error, signets ) => {
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