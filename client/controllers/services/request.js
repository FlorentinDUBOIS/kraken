// ----------------------------------------------------------------------------
// request service
filemanager.service( '$request', ['$http', '$logger', '$translate', function( $http, $logger, $translate ) {
    function errorHandler( res, callback ) {
        if( res.status === 403 ) {
            return $translate( 'request.authorized' ).then( function( trad ) {
                $logger.error( trad );

                callback( new Error( trad ));
            });
        }

        $translate( 'request.failure' ).then( function( trad ) {
            $logger.error( trad );

            callback( new Error( trad ));
        });
    }

    this.get = function( url, callback ) {
        $http.get( url ).then( function( res ) {
            callback( null, res.data );
        }, function( res ) {
            errorHandler( res, callback );
        });
    };

    this.post = function( url, data, callback ) {
        $http.post( url, data ).then( function( res ) {
            callback( null, res.data );
        }, function( res ) {
            errorHandler( res, callback );
        });
    };

    this.put = function( url, data, callback ) {
        $http.put( url, data ).then( function( res ) {
            callback( null, res.data );
        }, function( res ) {
            errorHandler( res, callback );
        });
    };

    this.delete = function( url, callback ) {
        $http.delete( url ).then( function( res ) {
            callback( null, res.data );
        }, function( res ) {
            errorHandler( res, callback );
        });
    };
}]);