# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
User   = require( 'server/models/db' ).models.User
logger = require 'server/models/logger'

# -----------------------------------------------------------------------------
# routes
router.all '*', ( req, res, next ) ->
    get  = ['/']
    post = ['/log']

    return next() if req.method is 'GET'  and -1 isnt get.indexOf req.params['0']
    return next() if req.method is 'POST' and -1 isnt post.indexOf req.params['0']

    return res.status( 403 ).redirect '/' unless req.session?
    return res.status( 403 ).redirect '/' unless req.session.user?

    User.find( _id: req.session.user._id ).count ( error, count ) ->
        if error?
            logger.error error.message

            return res.status( 500 ).end()

        unless count
            logger.warn "User #{ req.session.user.username } is not in database"

            return res.status( 403 ).redirect '/'

        next()

# -----------------------------------------------------------------------------
# exports
module.exports = router