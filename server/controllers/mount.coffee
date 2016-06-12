# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
pfs    = require 'server/models/fs'

# -----------------------------------------------------------------------------
# routes
router
    .route '/mount/*'
    .get ( req, res ) ->
        res.sendFile pfs.rewrite req.params['0']

# -----------------------------------------------------------------------------
# export
module.exports = router