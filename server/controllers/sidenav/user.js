// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();

// ----------------------------------------------------------------------------
// routes
router.route( '/sidenav/user' ).get(( req, res ) => {
    let routes = [];

    if( req.session.user.administrator ) {
        let routesAdministrator = [
            { icon: 'account_circle', name: 'navigation.manageAccount', link: '#/manage-account' }
        ];

        for( let route of routesAdministrator ) {
            routes.push( route );
        }
    }

    res.json( routes );
});

// ----------------------------------------------------------------------------
// exports routes
module.exports = router;