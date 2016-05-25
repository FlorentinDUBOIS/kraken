// ----------------------------------------------------------------------------
// requirements
const mongoose = require( './db' );

// ----------------------------------------------------------------------------
// exports
module.exports = mongoose.model( 'user', new mongoose.Schema({
    username:      mongoose.Schema.Types.String,
    password:      mongoose.Schema.Types.String,
    firstname:     mongoose.Schema.Types.String,
    lastname:      mongoose.Schema.Types.String,
    salt:          mongoose.Schema.Types.String,
    email:         mongoose.Schema.Types.String,
    administrator: mongoose.Schema.Types.Boolean
}));