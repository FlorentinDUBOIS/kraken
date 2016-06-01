# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()

# -----------------------------------------------------------------------------
# router
router
    .route '/log'
    .get ( req, res ) ->
        if req.session.user?
            return res.json
                connected: true

        res.json
            connected: false
    .post ( req, res ) ->
        res.status( 500 ).end()
    .put ( req, res ) ->
        res.status( 500 ).end()
    .delete ( req, res ) ->
        res.status( 500 ).end()

# -----------------------------------------------------------------------------
# exports
module.exports = router