# -----------------------------------------------------------------------------
# mongoose
mongoose = require 'server/models/db/database'

# -----------------------------------------------------------------------------
# create schema
ShareSchema = new mongoose.Schema
    user: mongoose.Schema.Types.ObjectId
    path: mongoose.Schema.Types.String

# -----------------------------------------------------------------------------
# exports
module.exports = mongoose.model 'share', ShareSchema
