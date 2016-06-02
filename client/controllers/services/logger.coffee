kraken.service '$logger', ['$mdToast', ( $mdToast ) ->
    @info = ( message ) ->
        $mdToast.show $mdToast.simple().textContent message

    @warn = ( message ) ->
        $mdToast.show $mdToast.simple().textContent message

    @error = ( message ) ->
        $mdToast.show $mdToast.simple().textContent message

    return
]