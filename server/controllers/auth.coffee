# -----------------------------------------------------------------------------
# requirements
router   = require( 'express' ).Router()
User     = require( 'server/models/db' ).models.User
logger   = require 'server/models/logger'
routes   = require 'server/admin'
allows   = require 'server/allow'
passport = require 'passport'

# -----------------------------------------------------------------------------
# routes
router.all '*', ( req, res, next ) ->
    for allow in allows
        if allow.method.test( req.method ) and -1 isnt allow.routes.indexOf req.params['0']
            return next()

    return res.status( 403 ).redirect '/' unless req.user?

    for route in routes
        if route.url.test( req.params['0'] ) and -1 isnt route.methods.indexOf req.method
            if req.user.administrator is false
                return res.status( 403 ).end()

    next()

# -----------------------------------------------------------------------------
# exports
module.exports = router