// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();
const sha512 = require( 'sha512' );
const path   = require( 'path' );
const User   = require( '../models/db' ).models.User;
const Logger = require( '../models/logger' );
const logger = new Logger( path.basename( __filename ));

// ----------------------------------------------------------------------------
// routes
router.route( '/log' ).post(( req, res ) => {
    if( !req.body || !req.body.username || !req.body.password ) {
        return res.status( 403 ).json({
            "login": false
        });
    }

    User.find({ username: req.body.username }, ( error, users ) => {
        if( error ) {
            logger.error( error.message );

            return res.status( 500 ).end();
        }

        if( !users.length ) {
            return res.status( 403 ).json({
                "login": false
            });
        }

        for( let user of users ) {
            if( user.password == sha512( `${ user.salt }:${ req.body.password }` ).toString( 'hex' )) {
                req.session.user = user;

                return res.json({
                    "login": true,
                    "redirect": "/home"
                });
            }
        }

       return res.status( 403 ).json({
           "login": false
       });
    });
}).delete(( req, res ) => {
    if( !req.session ) {
        return res.status( 500 ).end();
    }

    req.session.destroy(( error ) => {
        if( error ) {
            logger.error( error.message );

            return res.status( 500 ).end();
        }

        res.json({
            "success": true,
            "redirect": "/"
        });
    });
});

// ----------------------------------------------------------------------------
// exports
module.exports = router;