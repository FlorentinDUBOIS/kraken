# -----------------------------------------------------------------------------
# login contollers
kraken.controller 'kraken.login', ['$scope', '$user', '$logger', '$translate', '$window', ( $scope, $user, $logger, $translate, $window ) ->
    $scope.login  = {}
    $scope.submit = ->
        $user.login $scope.login.username, $scope.login.password, ( error, data ) ->
            return $logger.error error.mmessage if error?

            if data.connected
                $translate( 'login.success' ).then ( trad ) ->
                    $logger.info trad
                    $window.location.assign data.redirect
            else
                $translate( 'login.wrong' ).then ( trad ) ->
                    $logger.error trad

        false

    return
]