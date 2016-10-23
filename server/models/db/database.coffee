# -----------------------------------------------------------------------------
# requirements
mongoose = require 'mongoose'
logger   = require 'server/models/logger'

# -----------------------------------------------------------------------------
# connection
host = (
    process.env.MONGODB_HOST ||
    process.env.MONGODB_ADDON_HOST ||
    'localhost'
)

port = (
    process.env.MONGODB_PORT ||
    process.env.MONGODB_ADDON_PORT ||
    27017
)

base = (
    process.env.MONGODB_BASE ||
    process.env.MONGODB_ADDON_DB ||
    'kraken'
)

user = (
    process.env.MONGODB_USER ||
    process.env.MONGODB_ADDON_USER ||
    null
)

password = (
    process.env.MONGODB_PASSWORD ||
    process.env.MONGODB_ADDON_PASSWORD ||
    null
)

uri = "mongodb://#{ host }:#{ port }/#{ base }"
if user and password
    uri = "mongodb://#{ user }:#{ password }@#{ host }:#{ port }/#{ base }"

mongoose.connect uri, ( error ) ->
    if error
        logger.error error.message

# -----------------------------------------------------------------------------
# exports
module.exports = mongoose
