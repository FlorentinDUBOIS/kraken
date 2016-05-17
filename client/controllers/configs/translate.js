// ----------------------------------------------------------------------------
// config multi languages
filemanager.config(['$translateProvider', function( $translateProvider ) {
    var languages = ['en'];

    for( var i in languages ) {
        $translateProvider.translations( languages[i], require( 'json!../languages/' + languages[i] + '.lang.json' ));
    }

    $translateProvider.useSanitizeValueStrategy( null );
    $translateProvider.preferredLanguage( 'en' );
    $translateProvider.fallbackLanguage( 'en' );
}]);