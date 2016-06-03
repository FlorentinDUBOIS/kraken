# -----------------------------------------------------------------------------
# fs controller
kraken.controller 'kraken.manageAccount', ['$scope', '$user', '$translate', '$logger', ( $scope, $user, $translate, $logger ) ->
    $scope.users = []
    $scope.user  = {}

    # -----------------------------------------------------------------------------
    # get users
    $scope.getUsers = ->
        $user.getAll ( error, users ) ->
            unless error?
                $scope.users = users;

                $scope.updateUser.$setPristine()
                $scope.updateUser.$setUntouched()
                $scope.user = {}

    # -----------------------------------------------------------------------------
    # select an user
    $scope.select = ( $index ) ->
        $scope.user = $scope.users[$index]

    # -----------------------------------------------------------------------------
    # add an user
    $scope.add = ->
        $scope.users.push {}
        $scope.select $scope.users.length - 1

    # -----------------------------------------------------------------------------
    # remove user
    $scope.remove = ( $index ) ->
        $user.remove $scope.users[$index]._id, ( error, data ) ->
            unless error?
                if data.removed is true
                    $translate( 'manageAccount.removed' ).then ( trad ) ->
                        $logger.info trad
                        $scope.getUsers()

    # -----------------------------------------------------------------------------
    # save user
    $scope.save = ->
        if $scope.user._id?
            $user.update $scope.user, ( error, data ) ->
                unless error?
                    if data.updated is true
                        $translate( 'manageAccount.updated' ).then ( trad ) ->
                            $logger.info trad
                            $scope.getUsers()

        else
            $user.create $scope.user, ( error, data ) ->
                unless error?
                    if data.created is true
                        $translate( 'manageAccount.created' ).then ( trad ) ->
                            $logger.info trad
                            $scope.getUsers()

    # -----------------------------------------------------------------------------
    # init
    $scope.getUsers()

    return
]