# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
fs     = require 'fs'
pfs    = require 'server/models/fs'
async  = require 'async'
path   = require 'path'
logger = require 'server/models/logger'
walk   = require 'walk'

# -----------------------------------------------------------------------------
# router
router
    .route '/file-system/folder-menu/*'
    .delete ( req, res ) ->
        files   = []
        folders = []
        error   = false
        walker  = walk.walk pfs.rewrite( req.params['0'] ), followLinks: false

        walker.on 'file', ( root, stat, next ) ->
            logger.info "Mark file to delete : #{ path.join root, stat.name }"

            files.push path.join root, stat.name

            next()

        walker.on 'directory', ( root, stat, next ) ->
            logger.info "Mark folder to delete : #{ path.join root, stat.name }"

            folders.push path.join root, stat.name

            next()

        walker.on 'errors', ( root, stats, next ) ->
            error = true
            for stat in stats
                logger.error "Error on file or folder : #{ path.join root, stat.name }"

            next()

        walker.on 'end', ->
            return res.status( 500 ).end() if error

            async.map files, fs.unlink, ( error ) ->
                if error?
                    logger.error error.message

                    return res.status( 500 ).end()

                folders = folders.sort ( a, b ) ->
                    return -1 if a.length > b.length
                    return  1 if a.length < b.length
                    return  0 if a is b

                async.map folders, fs.rmdir, ( error ) ->
                    if error?
                        logger.error error.message

                        return res.status( 500 ).end()

                    fs.rmdir pfs.rewrite( req.params['0'] ), ( error ) ->
                        if error?
                            logger.error error.message

                            return res.status( 500 ).end()

                        res.json removed: true

# -----------------------------------------------------------------------------
# exports
module.exports = router