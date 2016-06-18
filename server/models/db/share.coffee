# -----------------------------------------------------------------------------
# requirements
mongoose = require 'server/models/db/database'
passport = require 'passport-local-mongoose'

# -----------------------------------------------------------------------------
# create Schema
ShareSchema = new mongoose.Schema
    user:     mongoose.Schema.Types.ObjectId
    path:     mongoose.Schema.Types.String
    password: mongoose.Schema.Types.String

# -----------------------------------------------------------------------------
# plugins
ShareSchema.plugin passport

# -----------------------------------------------------------------------------
# exports
module.exports = mongoose.model 'share', ShareSchema