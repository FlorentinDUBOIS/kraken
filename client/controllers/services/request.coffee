# -----------------------------------------------------------------------------
# request service
kraken.service '$request', ['$http', '$logger', '$translate', ( $http, $logger, $translate ) ->
    errorHandler = ( res, callback ) ->
        if res.status is 403
            return $translate( 'request.notAuthorized' ).then ( trad ) ->
                $logger.error trad

                callback res

        if res.status is 404
            return $translate( 'request.notFound' ).then ( trad ) ->
                $logger.error trad

                callback res

        $translate( 'request.failure' ).then ( trad ) ->
            $logger.error trad

            callback res

    @get = ( url, callback ) ->
        $http.get( url ).then ( res ) ->
            callback null, res.data
        , ( res ) ->
            errorHandler res, callback

    @post = ( url, data, callback ) ->
        $http.post( url, data ).then ( res ) ->
            callback null, res.data
        , ( res ) ->
            errorHandler res, callback

    @put = ( url, data, callback ) ->
        $http.put( url, data ).then ( res ) ->
            callback null, res.data
        , ( res ) ->
            errorHandler res, callback

    @patch = ( url, data, callback ) ->
        $http.patch( url, data ).then ( res ) ->
            callback null, res.data
        , ( res ) ->
            errorHandler res, callback

    @delete = ( url, callback ) ->
        $http.delete( url ).then ( res ) ->
            callback null, res.data
        , ( res ) ->
            errorHandler res, callback
]