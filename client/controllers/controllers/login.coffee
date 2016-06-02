# -----------------------------------------------------------------------------
# login contollers
kraken.controller 'kraken.login', ['$scope', '$user', '$logger', '$translate', '$window', '$timeout', ( $scope, $user, $logger, $translate, $window, $timeout ) ->
    $scope.login  = {}
    $scope.submit = ->
        $user.login $scope.login.username, $scope.login.password, ( error, data ) ->
            return $logger.error error.mmessage if error?

            if data.connected
                $translate( 'login.success' ).then ( trad ) ->
                    $logger.info trad
                    $timeout ->
                        $window.location.assign data.redirect
                    , 1000
            else
                $translate( 'login.wrong' ).then ( trad ) ->
                    $logger.error trad

        false

    return
]