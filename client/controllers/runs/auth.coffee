# -----------------------------------------------------------------------------
# verify if is administrator
kraken.run ['$rootScope', '$location', '$user', '$translate', '$logger', ( $rootScope, $location, $user, $translate, $logger ) ->
    paths = ['/manage-account']

    $rootScope.$on '$routeChangeStart', ->
        return if -1 is paths.indexOf $location.path()

        $user.isAdministrator ( error, data ) ->
            unless error?
                unless data.administrator
                    $translate( 'request.notAuthorized' ).then ( trad ) ->
                        $logger.error trad
                        $location.path '/fs'

    return
]