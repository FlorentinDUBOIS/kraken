// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();
const path   = require( 'path' );
const User   = require( '../models/db' ).models.User;
const Logger = require( '../models/logger' );
const logger = new Logger( path.basename( __filename ));

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
}).post(( req, res ) => {
    User.update({ _id: req.session.user._id }, req.body, ( error ) => {
        if( error ) {
            logger.error( error.message );

            return res.status( 500 ).end();
        }

        res.status( 200 ).end();
    });
}).put(( req, res ) => {
    User.update({ _id: req.session.user._id }, req.body, ( error ) => {
        if( error ) {
            logger.error( error.message );

            return res.status( 500 ).end();
        }

        res.status( 200 ).end();
    });
}).delete(( req, res ) => {
    User.remove({ _id: req.session.user._id }, ( error ) => {
        if( error ) {
            logger.error( error.message );

            return res.status( 500 ).end();
        }

        req.session.destroy(( error ) => {
            if( error ) {
                logger.error( error.message );

                return res.status( 500 ).end();
            }

            res.json({
                redirect: '/'
            });
        });
    })
});

// ----------------------------------------------------------------------------
// exports
module.exports = router;