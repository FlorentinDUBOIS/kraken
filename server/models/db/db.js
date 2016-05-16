// ----------------------------------------------------------------------------
// requirements
const mongoose = require( 'mongoose' );
const logger   = require( 'printit' )({
    date: true,
    prefix: 'MongoDB'
});

// ----------------------------------------------------------------------------
// connect
mongoose.connect( `mongodb://${ process.env.MONGODB_HOST }:${ process.env.MONGODB_PORT }/${ process.env.MONGODB_BASE }`, ( error ) => {
    if( error ) {
        logger.error( error.message );
    }
});

// ----------------------------------------------------------------------------
// exports
module.exports = mongoose;