# -----------------------------------------------------------------------------
# requirements
router   = require( 'express' ).Router()
User     = require( 'server/models/db' ).models.User
logger   = require 'server/models/logger'
passport = require 'passport'

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
        password = req.body.password
        data     = {}
        for i in req.body
            if i isnt 'password'
                data[i] = req.body[i]

        User.register new User( data ), password, ( error, user ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json created: true

router
    .route '/users/:_id'
    .get ( req, res ) ->
        User.findOne _id: req.params._id, ( error, user ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json user

    .put ( req, res ) ->
        User.findOne _id: req.params._id, ( error, user ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            user.update req.body, ( error ) ->
                if error?
                    logger.error error.message

                    return res.status( 500 ).end()

                res.json updated: true

    .delete ( req, res ) ->
        User.removeOne _id: req.params._id, ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json removed: true

# -----------------------------------------------------------------------------
# exports
module.exports = router