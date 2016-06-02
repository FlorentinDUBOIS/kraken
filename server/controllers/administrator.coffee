# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()

# -----------------------------------------------------------------------------
# router
router
    .route '/administrator'
    .get ( req, res ) ->
        return res.status( 500 ).end() if req.session.user?

        res.json administrator: req.session.user.administrator

# -----------------------------------------------------------------------------
# exports
module.exports = router