# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
fs     = require 'fs'
path   = require 'path'
async  = require 'async'
walk   = require 'walk'
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
                files[i] = pfs.rewrite path.join req.params['0'], file

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

    .patch ( req, res ) ->
        fs.rename pfs.rewrite( req.params['0'] ), pfs.rewrite( req.body.path ), ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json renamed: true

    .delete ( req, res ) ->
        fs.stat pfs.rewrite( req.params['0'] ), ( error, stat ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            unless stat.isDirectory()
                fs.unlink pfs.rewrite( req.params['0'] ), ( error ) ->
                    if error?
                        logger.error error.message

                        return res.status( 500 ).end()

                    res.json removed: true

            else
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
                            return  0 if a.length is b.length

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