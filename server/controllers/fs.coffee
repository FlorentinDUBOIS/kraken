# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
fs     = require 'fs'
path   = require 'path'
async  = require 'async'
pfs    = require 'server/models/fs'
logger = require 'server/models/logger'

# -----------------------------------------------------------------------------
# routes
router
    .route '/fs/*'
    .get ( req, res ) ->
        fs.readdir pfs.rewrite( req.params['0'] ), ( error, files ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            for i, file of files
                files[i] = pfs.rewrite file

            async.map files, fs.stat, ( error, stats ) ->
                if error?
                    logger.error error.message

                    return res.status( 500 ).end()

                data = []
                for i, file of files
                    data.push
                        name: path.basename file
                        size: stats[i].size
                        mtime: stats[i].mtime
                        directory: stats[i].isDirectory()

                res.json data

# -----------------------------------------------------------------------------
# exports
module.exports = router