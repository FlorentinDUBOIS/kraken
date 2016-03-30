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
const server      = http.Server( app );
const helmet      = require( 'helmet' );
const bparser     = require( 'body-parser' );
const cparser     = require( 'cookie-parser' );
const session     = require( 'express-session' );
const compression = require( 'compression' );

// -----------------------------------------------------------------------------
// special event
process.on( 'uncaughtException', function( exception ) {
    console.log( exception );
});

// -----------------------------------------------------------------------------
// configs
const secret = uuid.v4();

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
let directories = [
    'angular',
    'angular-animate',
    'angular-aria',
    'angular-material',
    'angular-messages',
    'angular-route',
    'angular-sanitize'
];

for( let directory of directories ) {
    app.use( `/libs/${ directory }`, express.static( `node_modules/${ directory }` ));
}

app.use( '/libs/angular-translate', express.static( 'node_modules/angular-translate/dist' ));
app.use( '/libs/normalize', express.static( 'node_modules/normalize.css' ));

// -----------------------------------------------------------------------------
// get routes
let walker = walk.walk( path.join( __dirname, 'routes' ), {});

walker.on( 'file', function( root, fileStats, next ) {
    app.use( require( path.join( root, fileStats.name )));

    next();
});

// -----------------------------------------------------------------------------
// server
server.listen( 80 );
