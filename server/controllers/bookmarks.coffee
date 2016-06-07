# -----------------------------------------------------------------------------
# requirements
router = require( 'express' ).Router()
Signet = require( 'server/models/db' ).models.Signet
logger = require 'server/models/logger'
pfs    = require 'server/models/fs'
fs     = require 'fs'
async  = require 'async'
path   = require 'path'

# -----------------------------------------------------------------------------
# router
router
    .route '/bookmarks'
    .get ( req, res ) ->
        Signet.find user: req.session.user._id, ( error, signets ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            data = []
            for signet in signets
                data.push
                    _id: signet._id
                    name: if '' isnt path.basename signet.path then path.basename signet.path  else '/'
                    path: signet.path
                    icon: 'folder'

            res.json data

    .post ( req, res ) ->
        signet = new Signet
            user: req.session.user._id
            path: req.body.path

        signet.save ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json inserted: true

    .delete ( req, res ) ->
        Signet.remove user: req.session.user._id, ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json removed: true

router
    .route '/bookmarks/:_id'
    .get ( req, res ) ->
        Signet.find _id: req.params._id, ( error, signets ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            data = []
            for signet in signets
                data.push
                    _id: signet._id
                    name: if '' isnt path.basename signet.path then path.basename signet.path  else '/'
                    icon: 'folder'

            res.json data

    .put ( req, res ) ->
        Signet.update _id: req.params._id, path: req.body.path, ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json updated: true

    .delete ( req, res ) ->
        Signet.remove _id: req.params._id, ( error ) ->
            if error?
                logger.error error.message

                return res.status( 500 ).end()

            res.json removed: true

# -----------------------------------------------------------------------------
# exports
module.exports = router