# -----------------------------------------------------------------------------
# requirements
path   = require 'path'
router = require( 'express' ).Router()

# -----------------------------------------------------------------------------
# views routes
router.route( '/views/*' ).get ( req, res ) ->
    res.render path.join __dirname, '../..', 'client/views', req.params['0']

# -----------------------------------------------------------------------------
# exports
module.exports = router