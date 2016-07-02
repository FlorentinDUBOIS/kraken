# -----------------------------------------------------------------------------
# kraken image service
kraken.service '$image', ['$mdDialog', '$window', ( $mdDialog, $window ) ->
    # -----------------------------------------------------------------------------
    # viewable format
    extensions = [
        'png'
        'jpg'
        'jpeg'
        'gif'
        'svg'
    ]

    # -----------------------------------------------------------------------------
    # isViewable
    @isViewable = ( name ) ->
        for extension in extensions
            if ( new RegExp "(\.#{ extension })$", 'i' ).test name
                return true

        false

    # -----------------------------------------------------------------------------
    # view
    @view = ( path, name ) ->
        $mdDialog.show
            parent: angular.element $window.document.querySelector 'body'
            clickOutsideToClose: true
            escapeToClose: true
            templateUrl: 'views/image.jade'
            controller: ['$fs', '$scope', ( $fs, $scope ) ->
                $scope.src = $fs.realpath "mount/#{ path }/#{ name }"

                return
            ]

    return
]
