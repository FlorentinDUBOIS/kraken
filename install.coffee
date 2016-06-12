# -----------------------------------------------------------------------------
# rootpath
(require 'rootpath')()

# -----------------------------------------------------------------------------
# requirements
User   = require( 'server/models/db' ).models.User
logger = require 'server/models/logger'

# -----------------------------------------------------------------------------
# create a default user
User.register new User( username: 'default', administrator: true ), 'password', ( error, user ) ->
    if error?
        logger.error error.message

        return process.exit 1

    logger.info 'Default user created'

    process.exit 0
