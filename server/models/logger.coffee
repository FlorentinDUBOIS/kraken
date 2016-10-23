# -----------------------------------------------------------------------------
# requirements
winston = require 'winston'
Console = require 'winston-printit'

# -----------------------------------------------------------------------------
# exports
module.exports = new winston.Logger
    transports: [
        new Console
            prefix: 'kraken'
    ]
