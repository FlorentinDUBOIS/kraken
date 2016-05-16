// ----------------------------------------------------------------------------
// set static routes
module.exports = [
    { syml: '/angular', real: 'node_modules/angular' },
    { syml: '/angular', real: 'node_modules/angular-animate' },
    { syml: '/angular', real: 'node_modules/angular-aria' },
    { syml: '/angular', real: 'node_modules/angular-material' },
    { syml: '/angular', real: 'node_modules/angular-messages' },
    { syml: '/angular', real: 'node_modules/angular-route' },
    { syml: '/angular', real: 'node_modules/angular-sanitize' },
    { syml: '/angular', real: 'node_modules/angular-translate/dist' },

    { syml: '/main.min.js',     real: 'client/dist/main.min.js' },
    { syml: '/imports.min.css', real: 'client/dist/imports.min.css' }
];