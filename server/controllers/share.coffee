# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
Share  = require( 'server/models/db' ).models.Share
logger = require 'server/models/logger'

# -----------------------------------------------------------------------------
# routes
router
    .route '/share'
    .get ( req, res ) ->
        Share.find {}, ( error, shares ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json shares

    .post ( req, res ) ->
        share = new Share req.body
        share.save ( error ) ->
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

    .put ( req, res ) ->
        Share.updateOne _id: req.params._id, req.body, ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json updated: true

    .delete ( req, res ) ->
        Share.remove _id: req.params._id, ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json deleted: true

# -----------------------------------------------------------------------------
# exports
module.exports = router
