# -----------------------------------------------------------------------------
# requirements
mongoose = require 'server/models/db/database'

# -----------------------------------------------------------------------------
# exports
module.exports = mongoose.model 'user', new mongoose.Schema
    username:
        type: mongoose.Schema.Types.String
        default: 'user'

    password:
        type: mongoose.Schema.Types.String
        default: ''

    firstname:
        type: mongoose.Schema.Types.String
        default: ''

    lastname:
        type: mongoose.Schema.Types.String
        default: ''

    salt:
        type: mongoose.Schema.Types.String
        default: ''

    email:
        type: mongoose.Schema.Types.String
        default: ''

    administrator:
        type: mongoose.Schema.Types.Boolean
        default: false