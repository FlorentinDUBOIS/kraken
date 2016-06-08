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
    .route '/file-system/root/*'
    .get ( req, res ) ->
        res.sendFile pfs.rewrite req.params['0']


# -----------------------------------------------------------------------------
# exports
module.exports = router