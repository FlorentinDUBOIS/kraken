# -----------------------------------------------------------------------------
# requirements
router   = require( 'express' ).Router()
Share    = require( 'server/models/db' ).models.Share
logger   = require 'server/models/logger'
passport = require 'passport'

# -----------------------------------------------------------------------------
# router
router
    .route '/share'
    .get ( req, res ) ->
        Share.find {}, ( error, shares ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json shares

    .post ( req, res ) ->
        data     = {}
        for i in req.body
            if i isnt 'password'
                data[i] = req.body[i]

        Share.register new Share( data ), req.body.password, ( error, user ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json created: true

router
    .route '/share/:_id'
    .get ( req, res ) ->
        Share.findOne _id: req.params._id, ( error, share ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json share

    .delete ( req, res ) ->
        Share.removeOne _id: req.params._id, ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json removed: true

# -----------------------------------------------------------------------------
# exports
module.exports = router