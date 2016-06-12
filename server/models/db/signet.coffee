# -----------------------------------------------------------------------------
# requirements
mongoose = require 'server/models/db/database'

# -----------------------------------------------------------------------------
# create Schemas
SignetSchema = new mongoose.Schema
    user: mongoose.Schema.Types.ObjectId
    path: mongoose.Schema.Types.String

# -----------------------------------------------------------------------------
# exports
module.exports = mongoose.model 'signet', SignetSchema