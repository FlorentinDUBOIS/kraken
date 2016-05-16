// ----------------------------------------------------------------------------
// requirements
const express     = require( 'express' );
const bparser     = require( 'body-parser' );
const helmet      = require( 'helmet' );
const compression = require( 'compression' );
const morgan      = require( 'morgan' );
const path        = require( 'path' );
const walk        = require( 'walk' );
const pug         = require( 'pug' );
const logger      = require( 'printit' )({
    date: true,
    prefix: 'Server'
});

// ----------------------------------------------------------------------------
// bind uncaught exception
process.on( 'uncaughtException', ( e ) => {
    if( e instanceof Array ) {
        for( var i in e ) {
            logger.error( e[i].message );
        }
    } else {
        logger.error( e.message );
    }
});

// ----------------------------------------------------------------------------
// create server
logger.info( 'Create server' );

const server  = express();

// ----------------------------------------------------------------------------
// settings
server.set( 'views', 'client/views' );
server.set( 'view engine', 'jade' );

server.engine( 'jade', pug.__express );

// ----------------------------------------------------------------------------
// load modules
logger.info( 'Load modules' );

server.use( helmet());
server.use( compression());
server.use( bparser.urlencoded({ extended: true }));
server.use( bparser.json());
server.use( morgan( 'dev' ));

// ----------------------------------------------------------------------------
// load static routes
let routes = require( './server/static' );

for( let route of routes ) {
    logger.info( `bind route ${ route.real } to ${ route.syml }` );

    server.use( route.syml, express.static( path.join( __dirname, route.real )));
}

// ----------------------------------------------------------------------------
// walk controller
logger.info( 'Create walker' );

let walker = walk.walk( path.join( __dirname, 'server', 'controllers' ));

walker.on( 'file', ( root, fileStats, next ) => {
    logger.info( `Load file : ${ path.join( root, fileStats.name ) }` )

    server.use( require( path.join( root, fileStats.name )));

    next();
});

// ----------------------------------------------------------------------------
// launch server
logger.info( 'Launch server' );

server.listen( process.env.PORT || 80, () => {
    logger.info( `Server launch at port ${ process.env.PORT || 80 }` );
});
