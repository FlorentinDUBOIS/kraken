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
    .route '/file-system/info/*'
    .get ( req, res ) ->
        fs.readdir pfs.rewrite( req.params['0'] ), ( error, files ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            for i, file of files
                files[i] = pfs.rewrite path.join req.params['0'], file

            async.map files, fs.stat, ( error, stats ) ->
                if error?
                    logger.error error.message

                    return res.status( 500 ).end()

                data =
                    files:   []
                    folders: []

                for i, file of files
                    to = null
                    to = 'files'   if stats[i].isFile()
                    to = 'folders' if stats[i].isDirectory()

                    continue unless to?

                    data[to].push
                        name: path.basename file
                        size: stats[i].size
                        path: req.params['0']
                        right: ( stats[i].mode & parseInt '777', 8 ).toString 8
                        btime: stats[i].birthtime
                        mtime: stats[i].mtime

                res.json data

    .put ( req, res ) ->
        fs.rename pfs.rewrite( req.params['0'] ), pfs.rewrite( req.body.path ), ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json renamed: true

# -----------------------------------------------------------------------------
# exports
module.exports = router