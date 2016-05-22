// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();
const path   = require( 'path' );
const sha512 = require( 'sha512' );
const User   = require( '../models/db' ).models.User;
const Logger = require( '../models/logger' );
const logger = new Logger( path.basename( __filename ));


// ----------------------------------------------------------------------------
// functions
function update( req, res ) {
    req.body.password = sha512( `${ req.body.salt }:${ req.body.password }` ).toString( 'hex' );

    User.update({ _id: req.session.user._id }, req.body, ( error ) => {
        if( error ) {
            logger.error( error.message );

            return res.status( 500 ).end();
        }

        res.status( 200 ).end();
    });
}

// ----------------------------------------------------------------------------
// routes
router.route( '/user' ).get(( req, res ) => {
    User.find({ _id: req.session._id }, ( error, users ) => {
        if( error ) {
            logger.error( error.message );

            return res.status( 500 ).end();
        }

        res.json( users[0] );
    });
}).post( update ).put( update ).delete(( req, res ) => {
    User.remove({ _id: req.session.user._id }, ( error ) => {
        if( error ) {
            logger.error( error.message );

            return res.status( 500 ).end();
        }

        res.status( 200 ).end();
    });
});

// ----------------------------------------------------------------------------
// exports
module.exports = router;