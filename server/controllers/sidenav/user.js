// ----------------------------------------------------------------------------
// requirements
const router = require( 'express' ).Router();

// ----------------------------------------------------------------------------
// routes
router.route( '/sidenav/user' ).get(( req, res ) => {
    let routes = [
        { icon: 'folder', name: 'navigation.fs', link: '#/fs' }
    ];

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