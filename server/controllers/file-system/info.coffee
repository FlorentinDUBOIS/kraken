# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
fs     = require 'fs'

# -----------------------------------------------------------------------------
# router
router
    .route '/file-system/info/*'
    .get ( req, res ) ->
        return
    .post ( req, res ) ->
        return
    .put ( req, res ) ->
        return
    .patch ( req, res ) ->
        return
    .delete ( req, res ) ->
        return

# -----------------------------------------------------------------------------
# exports
module.exports = router