# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
fs     = require 'fs'
pfs    = require 'server/models/fs'
async  = require 'async'
path   = require 'path'
logger = require 'server/models/logger'

# -----------------------------------------------------------------------------
# router
router
    .route '/file-system/file-menu/*'
    .delete ( req, res ) ->
        fs.unlink pfs.rewrite( req.params['0'] ), ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json removed: true

# -----------------------------------------------------------------------------
# exports
module.exports = router