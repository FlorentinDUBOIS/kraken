// ----------------------------------------------------------------------------
// requirements
const mongoose = require( './db' );

// ----------------------------------------------------------------------------
// exports
module.exports = mongoose.model( 'user', new mongoose.Schema({
    username:      String,
    password:      String,
    firstname:     String,
    lastname:      String,
    salt:          String,
    email:         String,
    administrator: Boolean
}));