// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();
const db     = require( '../models/db' );
const sha512 = require( 'sha512' );
const Logger = require( '../models/logger' );
const logger = new Logger( __filename );

// ----------------------------------------------------------------------------
// routes
router.post( '/log', ( req, res ) => {
    if( !req.body || !req.body.username || !req.body.password ) {
        logger.warn( 'POST without data' );

        return res.status( 403 )
                  .end();
    }

    db.models.User.find({ username: req.body.username }, ( error, users ) => {
       if( error ) {
           logger.error( error.message );

           return res.status( 500 )
                     .end();
       }

       if( !users.length ) {
           logger.warn( `user ${ req.body.username } is not in base` );

           return res.status( 403 )
                     .end();
       }

       for( var i in users ) {
           if( users[i].password == sha512( `${ users[i].salt }:${ req.body.password }` ).toString( 'hex' )) {
               logger.info( `user ${ req.body.username } is log` );

               req.session.user = users[i];

               return res.status( 200 )
                         .end();
           }
       }

       return res.status( 403 )
                 .end();
    });
});

// ----------------------------------------------------------------------------
// exports
module.exports = router;