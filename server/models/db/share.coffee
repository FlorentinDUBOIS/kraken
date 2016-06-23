# -----------------------------------------------------------------------------
# requirements
mongoose = require 'server/models/db/database'

# -----------------------------------------------------------------------------
# create Schema
ShareSchema = new mongoose.Schema
    user:      mongoose.Schema.Types.ObjectId
    path:      mongoose.Schema.Types.String
    password:  mongoose.Schema.Types.String
    available: mongoose.Schema.Types.Date

# -----------------------------------------------------------------------------
# exports
module.exports = mongoose.model 'share', ShareSchema
