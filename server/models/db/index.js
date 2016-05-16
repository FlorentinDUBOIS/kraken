// ----------------------------------------------------------------------------
// exports
module.exports = {
    mongoose: require( './db' ),
    schemas: {
        User: require( './user' )
    }
};