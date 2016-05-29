// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();
const path   = require( 'path' );
const User   = require( 'server/models/db' ).models.User;
const Logger = require( 'server/models/logger' );
const logger = new Logger( path.basename( __filename ));

// ----------------------------------------------------------------------------
// routes
router.all( '*', ( req, res, next ) => {
    let get  = ['/'];
    let post = ['/log'];

    if( req.method === 'GET'  && get.indexOf( req.params['0'] ) !== -1 ) {
        return next();
    }

    if( req.method === 'POST' && post.indexOf( req.params['0'] ) !== -1 ) {
        return next();
    }

    if( !req.session || !req.session.user ) {
        return res.status( 403 ).redirect( '/' );
    }

    User.find({ _id: req.session.user._id }).count(( error, count ) => {
       if( error ) {
           logger.error( error.message );

           return res.status( 500 ).end();
       }

       if( !count ) {
           logger.warn( `User not in data base "${ req.username }"` );

           return res.status( 500 ).end();
       }

       next();
    });
});

// ----------------------------------------------------------------------------
// exports
module.exports = router;