// ----------------------------------------------------------------------------
// requirements
const mongoose = require( './db' );

// ----------------------------------------------------------------------------
// exports
module.exports = mongoose.model( 'signet', new mongoose.Schema({
    username: String,
    path:     String
}));