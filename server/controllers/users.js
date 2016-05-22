// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();
const path   = require( 'path' );
const uuid   = require( 'uuid' );
const sha512 = require( 'sha512' );
const User   = require( '../models/db' ).models.User;
const Logger = require( '../models/logger' );
const logger = new Logger();

// ----------------------------------------------------------------------------
// routes
router.route( '/users' ).get(( req, res ) => {
    User.find({}, ( error, users ) => {
       if( error ) {
           logger.error( error.message );

           return res.status( 500 ).end();
       }

       res.json( users );
    });
}).post(( req, res ) => {
    let salt = uuid.v4();
    let user = new User({
        username: req.body.username,
        password: sha512( `${ salt }:${ req.body.password }` ).toString( 'hex' ),
        salt: salt,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        administrator: req.body.administrator
    });

    user.save(( error ) => {
        if( error ) {
            logger.error( error.message );

            return res.status( 500 ).end();
        }

        res.status( 200 ).end();
    });
}).put(( req, res ) => {
    req.body.password = sha512( `${ req.body.salt }:${ req.body.password }` ).toString( 'hex' );

    User.update({ _id: req.body._id }, req.body, ( error ) => {
        if( error ) {
            logger.error( error.message );

            return res.status( 500 ).end();
        }

        res.status( 200 ).end();
    });
});

router.route( '/users/:_id' ).delete(( req, res ) => {
    User.remove({ _id: req.params._id }, ( error ) => {
        if( error ) {
            logger.error( error.message );

            return res.status( 500 ).end();
        }

        res.status( 200 ).end();
    });
});

// ---------------------------------------------------------------------------
// exports
module.exports = router;