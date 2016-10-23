# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()

# -----------------------------------------------------------------------------
# router
router
    .route '/'
    .get ( req, res ) ->
        res.render 'index.jade',
            env: process.env

# -----------------------------------------------------------------------------
# exports
module.exports = router
