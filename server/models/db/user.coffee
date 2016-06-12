# -----------------------------------------------------------------------------
# requirements
mongoose = require 'server/models/db/database'
passport = require 'passport-local-mongoose'

# -----------------------------------------------------------------------------
# create schema
UserSchema = new mongoose.Schema
    username:      mongoose.Schema.Types.String
    password:      mongoose.Schema.Types.String
    firstname:     mongoose.Schema.Types.String
    lastname:      mongoose.Schema.Types.String
    email:         mongoose.Schema.Types.String
    administrator: mongoose.Schema.Types.Boolean

# -----------------------------------------------------------------------------
# plugins
UserSchema.plugin passport

# -----------------------------------------------------------------------------
# methods
UserSchema.methods.update = ( data, callback ) ->
    fields = ['username', 'firstname', 'lastname', 'email', 'administrator']

    for field in fields
        if data[field]? and this[field] isnt data[field]
            this[field] = data[field]

    if data.password?
        this.setPassword data.password, ( error, model, passwordError ) =>
            return callback error if error?
            return callback passwordError if passwordError?

            this.save callback

# -----------------------------------------------------------------------------
# exports
module.exports = mongoose.model 'user', UserSchema