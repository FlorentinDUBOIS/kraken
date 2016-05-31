# -----------------------------------------------------------------------------
# requirements
winston = require 'winston'
printit = require 'printit'
console = printit()

# -----------------------------------------------------------------------------
# overload log function
console.log = ( level, message ) ->
    return console[level] message if console[level]?

    console.info message

# -----------------------------------------------------------------------------
# exports
module.exports = new winston.Logger
    transports: [console]
