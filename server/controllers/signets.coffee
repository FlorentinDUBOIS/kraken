# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
logger = require 'server/models/logger'
Signet = require( 'server/models/db' ).models.Signet

# -----------------------------------------------------------------------------
# routes
router
    .route '/signets'
    .get ( req, res ) ->
        Signet.find {}, ( error, signets ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json signets

    .post ( req, res ) ->
        signet = new Signet
            user: req.user._id
            path: req.body.path

        signet.save ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json created: true

router
    .route '/signets/:_id'
    .get ( req, res ) ->
        Signet.findOne _id: req.params._id, ( error, signet ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json signet

    .put ( req, res ) ->
        Signet.update _id: req.params['0'], path: req.body.path, ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json updated: true

    .delete ( req, res ) ->
        Signet.remove _id: req.params._id, ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json removed: true

# -----------------------------------------------------------------------------
# exports
module.exports = router