// ----------------------------------------------------------------------------
// requirements
const mongoose = require( 'mongoose' );
const Logger   = require( '../logger' );
const path     = require( 'path' );
const logger   = new Logger( path.basename( __filename ));

// ----------------------------------------------------------------------------
// connect
mongoose.connect( `mongodb://${ process.env.MONGODB_HOST || 'localhost' }:${ process.env.MONGODB_PORT || '27017' }/${ process.env.MONGODB_BASE || 'kraken' }`, ( error ) => {
    if( error ) {
        logger.error( error.message );
    }
});

// ----------------------------------------------------------------------------
// exports
module.exports = mongoose;