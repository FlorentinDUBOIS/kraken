# -----------------------------------------------------------------------------
# requirements
router   = require( 'express' ).Router()
User     = require( 'server/models/db' ).models.User
logger   = require 'server/models/logger'
passport = require 'passport'

# -----------------------------------------------------------------------------
# router
router
    .route '/log'
    .get ( req, res ) ->
        return res.json connected: true if req.user?

        res.json connected: false

    .post passport.authenticate( 'local' ), ( req, res ) ->
        res.json
            connected: true
            redirect: '/home'

    .delete ( req, res ) ->
        return res.json redirect: false unless req.session?

        req.session.destroy ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            req.logout()
            res.json redirect: '/'

# -----------------------------------------------------------------------------
# exports
module.exports = router