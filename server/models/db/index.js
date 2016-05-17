// ----------------------------------------------------------------------------
// exports
module.exports = {
    mongoose: require( './db' ),
    models: {
        User: require( './user' )
    }
};