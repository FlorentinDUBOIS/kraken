// ----------------------------------------------------------------------------
// requirements
const winston = require( 'winston' );
const printit = require( 'printit' );

// ----------------------------------------------------------------------------
// class
class Logger {
    constructor( prefix ) {
        let print = printit({
            prefix: prefix,
            date: false
        });

        print.log = ( level, message ) => {
            if( print[level] ) {
                return print[level]( message );
            }

            print.info( message );
        };

        this.logger = new (winston.Logger)({
            transports: [print]
        });
    }

    info( message ) {
        this.log( 'info', message );
    }

    warn( message ) {
        this.log( 'warn', message );
    }

    error( message ) {
        this.log( 'error', message );
    }

    log( level, message ) {
        this.logger.log( level, message );
    }
}

// ----------------------------------------------------------------------------
// exports
module.exports = Logger;