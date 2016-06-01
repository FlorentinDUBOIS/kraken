# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()

# -----------------------------------------------------------------------------
# router
router
    .route '/users'
    .get ( req, res ) ->
        res.status( 500 ).end()
    .post ( req, res ) ->
        res.status( 500 ).end()
    .put ( req, res ) ->
        res.status( 500 ).end()
    .delete ( req, res ) ->
        res.status( 500 ).end()

router
    .route '/users/:_id'
    .get ( req, res ) ->
        res.status( 500 ).end()
    .post ( req, res ) ->
        res.status( 500 ).end()
    .put ( req, res ) ->
        res.status( 500 ).end()
    .delete ( req, res ) ->
        res.status( 500 ).end()

# -----------------------------------------------------------------------------
# exports
module.exports = router