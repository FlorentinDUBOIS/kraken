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
logger.info( 'Bind process events' );
logger.info( 'Bind process event : "uncaughtException"' );
process.on( 'uncaughtException', ( e ) => {
    logger.error( e.message );
});

// -----------------------------------------------------------------------------
// configs
logger.info( 'Load configurations' );
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
logger.info( 'Bind static routes' );

let routes = [
    { real: 'views',                             syml: '/views' },
    { real: 'views/stylesheets/dist',            syml: '/stylesheets' },
    { real: 'node_modules/materialize-css/dist', syml: '/materialize' },
    { real: 'node_modules/jquery/dist',          syml: '/javascripts' }
];

for( let route of routes ) {
    logger.info( `Bind static route : ${ route.real } -> ${ route.syml }` );
    app.use( route.syml, express.static( route.real ));
}
// -----------------------------------------------------------------------------
// get routes
let walker = walk.walk( path.join( __dirname, 'routes' ), {});

logger.info( 'Load routes' );
walker.on( 'file', ( root, fileStats, next ) => {
    logger.info( `Load routes in files : ${ path.join( root, fileStats.name ) }` );
    app.use( require( path.join( root, fileStats.name )));

    next();
});

logger.info( 'Launch server at ::1:80' );
// -----------------------------------------------------------------------------
// server
server.listen( 80 );
