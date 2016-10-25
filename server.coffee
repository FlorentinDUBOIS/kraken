# -----------------------------------------------------------------------------
# rootpath
(require 'rootpath')()

# -----------------------------------------------------------------------------
# requirements
pug         = require 'pug'
uuid        = require 'uuid'
path        = require 'path'
walk        = require 'walk'
express     = require 'express'
morgan      = require 'morgan'
helmet      = require 'helmet'
method      = require 'method-override'
bparser     = require 'body-parser'
compression = require 'compression'
session     = require 'express-session'
logger      = require 'server/models/logger'
db          = require 'server/models/db'
passport    = require 'passport'
Strategy    = require( 'passport-local' ).Strategy
MongoStore  = require( 'connect-mongo' )( session )
mongoose    = require 'server/models/db/database'

# -----------------------------------------------------------------------------
# uncaughtException
process.on 'uncaughtException', ( error ) ->
    logger.error error.message

# -----------------------------------------------------------------------------
# exit
process.on 'exit', ->
    logger.info 'close connection to database'

    db.mongoose.disconnect ( error ) ->
        if error?
            return logger.error error.message

        logger.info 'connection closed'

# -----------------------------------------------------------------------------
# create server
logger.info 'Create server'

server = express()

# -----------------------------------------------------------------------------
# settings
logger.info 'Configure server'

server.set 'views', 'client/views'
server.set 'view engine', 'jade'

server.engine 'jade', pug.__express

# -----------------------------------------------------------------------------
# load modules
logger.info 'Load modules'

server.use helmet()
server.use method()
server.use compression()
server.use bparser.urlencoded extended: true
server.use bparser.json()
server.use session
    genid: uuid.v4
    secret: uuid.v4()
    resave: false
    saveUninitialized: true
    store: new MongoStore mongooseConnection: mongoose.connection

server.use passport.initialize()
server.use passport.session()

if 'production' isnt server.get 'env'
    server.use morgan 'dev'
else
    server.use morgan 'common'

# -----------------------------------------------------------------------------
# passport config
passport.use new Strategy db.models.User.authenticate()
passport.serializeUser db.models.User.serializeUser()
passport.deserializeUser db.models.User.deserializeUser()

# -----------------------------------------------------------------------------
# Load static routes
routes = require 'server/static'

for i, route of routes
    logger.info "bind route : #{ route.real } to #{ route.syml }"

    server.use route.syml, express.static path.join __dirname, route.real

# -----------------------------------------------------------------------------
# walk over controllers
walker = walk.walk path.join __dirname, 'server', 'controllers'
walker.on 'file', ( root, stat, next ) ->
    logger.info "Load controller : #{ path.join( root, stat.name ).replace __dirname, '' }"

    server.use require path.join root, stat.name

    next()

# -----------------------------------------------------------------------------
# launch server
server.listen process.env.PORT || 80, ->
    logger.info "Server launch at port #{ process.env.PORT || 80 }"
