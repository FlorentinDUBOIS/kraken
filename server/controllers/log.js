// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();
const User   = require( '../models/db' ).models.User;
const sha512 = require( 'sha512' );
const Logger = require( '../models/logger' );
const path   = require( 'path' );
const logger = new Logger( path.basename( __filename ));

// ----------------------------------------------------------------------------
// routes
router.route( '/log' ).post(( req, res ) => {
    if( !req.body || !req.body.username || !req.body.password ) {
        logger.warn( 'POST without data' );

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
            logger.warn( `user ${ req.body.username } is not in base` );

            return res.status( 403 ).json({
                "login": false
            });
        }

        for( let user of users ) {
            if( user.password == sha512( `${ user.salt }:${ req.body.password }` ).toString( 'hex' )) {
                 logger.info( `user "${ req.body.username }" is log` );

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