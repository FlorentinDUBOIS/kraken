# -----------------------------------------------------------------------------
# to upper filter
kraken.filter 'upper', [->
    ( input ) ->
        input = input.toUpperCase() if input?
        input
]