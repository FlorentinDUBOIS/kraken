# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()

# -----------------------------------------------------------------------------
# router
router
    .route '/home'
    .get ( req, res ) ->
        res.render 'home.jade',
            env: process.env

# -----------------------------------------------------------------------------
# exports
module.exports = router
