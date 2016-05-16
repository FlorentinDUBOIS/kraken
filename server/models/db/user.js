// ----------------------------------------------------------------------------
// requirements
const mongoose = require( './db' );

// ----------------------------------------------------------------------------
// exports
module.exports = mongoose.model( 'user', new mongoose.Schema({
    username: String,
    password: String,
    email:    String
}));