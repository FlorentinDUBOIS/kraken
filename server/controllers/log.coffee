# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
User   = require( 'server/models/db' ).models.User
sha512 = require 'sha512'
logger = require 'server/models/logger'

# -----------------------------------------------------------------------------
# router
router
    .route '/log'
    .get ( req, res ) ->
        return res.json connected: true if req.session.user?

        res.json connected: false
    .post ( req, res ) ->
        return res.json connected: false unless req.body? or req.body.username? or req.body.password?

        User.find username: req.body.username, ( error, users ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            return res.json connected: false if users.length is 0

            for i, user of users
                if user.password is sha512( "#{ user.salt }:#{ req.body.password }" ).toString 'hex'
                    req.session.user = user

                    return res.json
                        connected: true
                        redirect: '/home'

            res.json connected: false

    .delete ( req, res ) ->
        return res.json redirect: false unless req.session?

        req.session.destroy ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json redirect: '/'

# -----------------------------------------------------------------------------
# exports
module.exports = router