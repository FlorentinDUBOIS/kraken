# -----------------------------------------------------------------------------
# requirements
router   = require( 'express' ).Router()
User     = require( 'server/models/db' ).models.User
logger   = require 'server/models/logger'
routes   = require 'server/admin'
allows   = require 'server/allow'
passport = require 'passport'
in_array = require 'in_array'

# -----------------------------------------------------------------------------
# routes
router.all '*', ( req, res, next ) ->
    for i, allow of allows
        if allow.method is req.method.toLowerCase() and in_array req.params['0'], allow.routes
            return next()

    return res.status( 403 ).redirect '/' unless req.user?

    for route in routes
        if route.url.test( req.params['0'] ) and in_array req.method, route.methods
            if req.user.administrator is false
                return res.status( 403 ).end()

    next()

# -----------------------------------------------------------------------------
# exports
module.exports = router
