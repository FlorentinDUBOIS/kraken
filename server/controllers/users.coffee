# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
User   = require( 'server/models/db' ).models.User
logger = require 'server/models/logger'
sha512 = require 'sha512'
uuid   = require 'uuid'

# -----------------------------------------------------------------------------
# router
router
    .route '/users'
    .get ( req, res ) ->
        User.find {}, ( error, users ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json users

    .post ( req, res ) ->
        salt = uuid.v4()

        req.body.salt     = salt
        req.body.password = sha512( "#{ salt }:#{ req.body.password }" ).toString 'hex'

        user = new User req.body
        user.save ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json created: true

router
    .route '/users/:_id'
    .get ( req, res ) ->
        User.find _id: req.params._id, ( error, users ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json users[0]

    .put ( req, res ) ->
        User.find _id: req.params._id, ( error, users ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            if users[0].password isnt req.body.password
                req.body.password = sha512( "#{ users[0].salt }:#{ req.body.password }" ).toString 'hex'

            User.update _id: req.params._id, req.body, ( error ) ->
                if error?
                    logger.error error.message

                    return res.status( 500 ).end()

                res.json updated: true

    .delete ( req, res ) ->
        User.remove _id: req.params._id, ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json removed: true

# -----------------------------------------------------------------------------
# exports
module.exports = router