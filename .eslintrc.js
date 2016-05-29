module.exports = {
    extends: 'eslint:recommended',
    env: {
        browser: true,
        node: true,
        es6: true
    },

    globals: {
        filemanager: true,
        angular: true
    },

    rules: {
        'strict': 'off',

        'block-scoped-var': 'error',
        'complexity': 'error',
        'default-case': 'error',
        'eqeqeq': 'error',
        'camelcase': 'warn',

        'no-alert': 'error',
        'no-caller': 'error',
        'no-empty-function': 'error',
        'no-eval': 'error',
        'no-implicit-globals': 'error',
        'no-invalid-this': 'error',
        'no-magic-numbers': 'warn',
        'no-iterator': 'error',
        'no-lone-blocks': 'warn',
        'no-loop-func': 'error',
        'no-labels': 'warn',
        'no-param-reassign': 'warn',
        'no-script-url': 'error',
        'no-throw-literal': 'error',
        'no-unmodified-loop-condition': 'warn',
        'no-unused-expressions': 'warn',
        'no-unused-vars': 'warn',
        'no-unused-labels': 'warn',
        'no-useless-call': 'warn',
        'no-useless-concat': 'warn',
        'no-useless-escape': 'warn',
        'no-label-var': 'error'
    }
};