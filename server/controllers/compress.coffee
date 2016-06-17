# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
fs     = require 'fs'
pfs    = require 'server/models/fs'
walk   = require 'walk'
zip    = new (require 'nodejs-zip' )()
unzip  = require 'extract-zip'
path   = require 'path'
logger = require 'server/models/logger'

# -----------------------------------------------------------------------------
# routes
router
    .route '/compress/*'
    .post ( req, res ) ->
        fs.stat pfs.rewrite( req.params['0'] ), ( error, stat ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            unless stat.isDirectory()
                zip.compress pfs.rewrite( "#{ req.params['0'] }.zip" ), [ pfs.rewrite( req.params['0'] )], [], ( error ) ->
                    if error?
                        logger.error error.message

                        return res.status( 500 ).end()

                    res.json compressed: true

            else
                error  = false
                files  = []
                walker = walk.walk pfs.rewrite( req.params['0'] ), followLinks: false

                walker.on 'file', ( root, stat, next ) ->
                    logger.info "Marked file to be compress : #{ path.join root, stat.name }"

                    files.push path.join root, stat.name

                    next()

                walker.on 'errors', ( root, stats, next ) ->
                    error = true
                    for stat in stats
                        logger.error "Error on file or folder to be compress : #{ path.join root, stat.name }"

                    next()

                walker.on 'end', ->
                    return res.status( 500 ).end() if error

                    zip.compress pfs.rewrite( "#{ req.params['0'] }.zip" ), files, [], ( error ) ->
                        if error?
                            logger.error error.message

                            return res.status( 500 ).end()

                        res.json compressed: true

    .delete ( req, res ) ->
        unzip pfs.rewrite( req.params['0'] ), dir: path.dirname( pfs.rewrite req.params['0'] ), ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json uncompressed: true

# -----------------------------------------------------------------------------
# exports
module.exports = router