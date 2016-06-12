# -----------------------------------------------------------------------------
# requirements
router   = require( 'express' ).Router()
User     = require( 'server/models/db' ).models.User
logger   = require 'server/models/logger'
passport = require 'passport'

# -----------------------------------------------------------------------------
# routes
router.all '*', ( req, res, next ) ->
    get  = ['/']
    post = ['/log']

    return next() if req.method is 'GET'  and -1 isnt get.indexOf req.params['0']
    return next() if req.method is 'POST' and -1 isnt post.indexOf req.params['0']

    return res.status( 403 ).redirect '/' unless req.user?

    next()

# -----------------------------------------------------------------------------
# exports
module.exports = router