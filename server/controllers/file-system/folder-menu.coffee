# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
fs     = require 'fs'
pfs    = require 'server/models/fs'
async  = require 'async'
path   = require 'path'

# -----------------------------------------------------------------------------
# router
router
    .route '/file-system/folder-menu/*'

# -----------------------------------------------------------------------------
# exports
module.exports = router