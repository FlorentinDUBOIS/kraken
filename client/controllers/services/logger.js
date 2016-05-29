// ----------------------------------------------------------------------------
// logger service
filemanager.service( '$logger', ['$translate', '$mdToast', function( $translate, $mdToast ) {
    var $this = this;

    this.info = function( message ) {
        $mdToast.show(
            $mdToast.simple()
                    .textContent( message )
        );
    };

    this.error = function( message ) {
        $mdToast.show(
            $mdToast.simple()
                    .textContent( message )
        );
    };
}]);