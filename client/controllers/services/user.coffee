kraken.service '$user', ['$request', ( $request ) ->
    @get = ( _id, callback ) ->
        $request.get "users/#{ _id }", callback

    @update = ( user, callback ) ->
        $request.put "users/#{ user._id }", user,  callback

    @remove = ( _id, callback ) ->
        $request.delete "users/#{ _id }", callback

    @create = ( user, callback ) ->
        $request.post 'users', user, callback

    @getAll = ( callback ) ->
        $request.get 'users', callback

    @isLog = ( callback ) ->
        $request.get 'log', callback

    @login = ( username, password, callback ) ->
        $request.post 'log',
            username: username
            password: password
        , callback

    @logout = ( callback ) ->
        $request.delete 'log', callback

    @isAdministrator = ( callback ) ->
        $request.get 'administrator', callback

    return
]