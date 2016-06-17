# -----------------------------------------------------------------------------
# router configs
kraken.config ['$routeProvider', ( $routeProvider ) ->
    routes = [
        { path: '/fs', controller: 'fs', templateUrl: 'views/fs.jade' }
        { path: '/fs/:signet', controller: 'fs', templateUrl: 'views/fs.jade' }
        { path: '/manage-account', controller: 'manageAccount', templateUrl: 'views/manage-account.jade' }
    ]

    for i, route of routes
        $routeProvider.when route.path,
            controller: "kraken.#{ route.controller }"
            templateUrl: route.templateUrl

    $routeProvider.otherwise '/fs'

    return
]