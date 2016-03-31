// -----------------------------------------------------------------------------
// server configuration
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// requirements
const express     = require( 'express' );
const app         = express();
const walk        = require( 'walk' );
const jade        = require( 'jade' );
const http        = require( 'http' );
const path        = require( 'path' );
const uuid        = require( 'uuid' );
const helmet      = require( 'helmet' );
const bparser     = require( 'body-parser' );
const cparser     = require( 'cookie-parser' );
const session     = require( 'express-session' );
const compression = require( 'compression' );

const logger      = require( './libs/logger' );
const server      = http.Server( app );
const secret      = uuid.v4();

// -----------------------------------------------------------------------------
// special event
process.on( 'uncaughtException', ( e ) => {
    logger.error( e.message );
});

// -----------------------------------------------------------------------------
// configs
app.engine( 'jade', jade.__express );

app.set( 'views', path.join( __dirname, 'views' ));
app.set( 'view engine', 'jade' );

app.use( helmet());
app.use( compression());
app.use( bparser.urlencoded({ extended: true }));
app.use( bparser.json());
app.use( cparser( secret ));
app.use( session({
    genid: uuid.v4,
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}));

// -----------------------------------------------------------------------------
// static files
app.use( '/libs/react', express.static( 'views/react-compiled' ));
app.use( '/libs/normalize', express.static( 'node_modules/normalize.css' ));

// -----------------------------------------------------------------------------
// get routes
let walker = walk.walk( path.join( __dirname, 'routes' ), {});

walker.on( 'file', ( root, fileStats, next ) => {
    logger.info( `Load routes files ${ path.join( root, fileStats.name ) }` );
    app.use( require( path.join( root, fileStats.name )));

    next();
});

logger.info( 'Launch server at 0.0.0.0:80' );
// -----------------------------------------------------------------------------
// server
server.listen( 80 );
