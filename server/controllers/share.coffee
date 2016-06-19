# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
Share  = require( 'server/models/db' ).models.Share
logger = require 'server/models/logger'
sha512 = require 'sha512'

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
        data =
            user: req.user._id
            path: req.body.path
            password: sha512( req.body.password ).toString 'hex'

        share = new Share data
        share.save ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json
                created: true
                _id: share._id

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