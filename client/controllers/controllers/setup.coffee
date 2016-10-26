kraken.controller 'kraken.setup', ['$scope', '$http', '$window', '$mdToast', '$translate', ( $scope, $http, $window, $mdToast, $translate ) ->
    $scope.setup = {}
    $scope.submit = ( event ) ->
        unless event.defaultPrevented
            event.preventDefault()

        $http
            .post( 'setup', $scope.setup )
            .then ( res ) ->
                if res.data.redirect
                    $window.location.assign "#{ $window.location.origin }##{ res.data.redirect }"

            .catch ( error ) ->
                $translate( 'setup.error.request' ).then ( trad ) ->
                    position =
                        bottom: false,
                        top: true,
                        left: false,
                        right: true

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent trad
                            .position position
                            .hideDelay 4000
                    )

        return false

    return
]
