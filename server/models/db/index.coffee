module.exports =
    db: require 'server/models/db/database'
    models:
        User: require 'server/models/db/user'
        Signet: require 'server/models/db/signet'