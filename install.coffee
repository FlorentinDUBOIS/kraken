# -----------------------------------------------------------------------------
# rootpath
(require 'rootpath')()

# -----------------------------------------------------------------------------
# requirements
User   = require( 'server/models/db' ).models.User
sha512 = require 'sha512'
uuid   = require 'uuid'
logger = require 'server/models/logger'

# -----------------------------------------------------------------------------
# create a default user
salt = uuid.v4()
user = new User
    username: 'default'
    password: sha512( "#{ salt }:password" ).toString 'hex'
    salt: salt
    administrator: true

user.save ( error ) ->
    if error
        logger.error error.message

        return process.exit 1

    logger.info "Default user created"

    process.exit 0
