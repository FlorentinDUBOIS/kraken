// ----------------------------------------------------------------------------
// rootpath
require( 'rootpath' )();

// ----------------------------------------------------------------------------
// bind uncaught exception
process.on( 'uncaughtException', ( e ) => {
    if( e instanceof Array ) {
        for( var i in e ) {
            logger.error( e[i].message );
        }
    } else {
        logger.error( e.message );
    }

    process.exit( 1 );
});

// ----------------------------------------------------------------------------
// requirements
const path   = require( 'path' );
const uuid   = require( 'uuid' );
const sha512 = require( 'sha512' );
const User   = require( './server/models/db' ).models.User;
const Logger = require( './server/models/logger' );
const logger = new Logger( path.basename( __filename ));

// ----------------------------------------------------------------------------
// insert new user
let salt = uuid.v4();
let user = new User({
    username: 'user',
    password: sha512( `${ salt }:password` ).toString( 'hex' ),
    salt: salt,
    firstname: '',
    lastname: '',
    email: '',
    administrator: true
});

user.save(( error ) => {
    if( error ) {
        return logger.error( error.message );
    }

    logger.info( 'Default user created' );

    process.exit( 0 );
});