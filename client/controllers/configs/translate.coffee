# -----------------------------------------------------------------------------
# config multi languages
kraken.config(['$translateProvider', ( $translateProvider ) ->
    languages = ['en'];

    for language in languages
        $translateProvider.translations( language, require( "json!../languages/#{ language }.lang.json" ));

    $translateProvider.useSanitizeValueStrategy( null );
    $translateProvider.preferredLanguage( 'en' );
    $translateProvider.fallbackLanguage( 'en' );
]);