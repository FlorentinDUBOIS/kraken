# -----------------------------------------------------------------------------
# to lower filter
kraken.filter 'lower', [->
    ( input ) ->
        input = input.toLowerCase() if input?
        input
]