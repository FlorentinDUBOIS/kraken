# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
User = require 'server/models/db/user'
logger = require 'server/models/logger'

# -----------------------------------------------------------------------------
# route
router
    .route '/setup'

    .get ( req, res ) ->
        User.count {}, ( error, count ) ->
            if error
                logger.error error.message

                return res.status( 500 ).end()

            if count
                return res.redirect '/'

            res.render 'setup.jade',
                env: process.env

    .post ( req, res ) ->
        User.count {}, ( error, count ) ->
            if error
                logger.error error.message

                return res.status( 500 ).end()

            unless count
                password = req.body.password

                delete req.body.password
                user = new User Object.assign req.body,
                    administrator: true

                User.register user, password, ( error, user ) ->
                    if error?
                        logger.error error.message

                        return res.status( 500 ).end()

                    res.json redirect: '/'
            else
                res.redirect '/'

# -----------------------------------------------------------------------------
# exports
module.exports = router
