# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
User   = require 'server/models/db/user'
logger = require 'server/models/logger'

# -----------------------------------------------------------------------------
# router
router
    .route '/'
    .get ( req, res ) ->
        User.count {}, ( error, count ) ->
            if error
                logger.error error.message

                return res.status( 500 ).end()

            if count
                res.render 'index.jade',
                    env: process.env
            else
                res.redirect '/setup'


# -----------------------------------------------------------------------------
# exports
module.exports = router
