# -----------------------------------------------------------------------------
# requirements
mongoose = require 'mongoose'
logger   = require 'server/models/logger'

# -----------------------------------------------------------------------------
# connection
host = process.env.MONGODB_HOST || 'localhost'
port = process.env.MONGODB_PORT || 27017
base = process.env.MONGODB_BASE || 'kraken'

mongoose.connect "mongodb://#{ host }:#{ port }/#{ base }", ( error ) ->
    if error
        logger.error error.message

# -----------------------------------------------------------------------------
# exports
module.exports = mongoose