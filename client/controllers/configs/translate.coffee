# -----------------------------------------------------------------------------
# config multi languages
kraken.config ['$translateProvider', 'en_US', ( $translateProvider, en_US ) ->
    $translateProvider.translations 'en_US', en_US

    $translateProvider.useSanitizeValueStrategy null
    $translateProvider.preferredLanguage 'en_US'
    $translateProvider.fallbackLanguage 'en_US'

    return
]