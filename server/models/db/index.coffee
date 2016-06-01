module.exports =
    db: require 'server/models/db/database'
    schemas:
        User: require 'server/models/db/user'